(() => {
  // Main tree renderer + UI
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d', { alpha: true });

  const $reset = document.getElementById('reset');
  const $stats = document.getElementById('stats');

  const $ptitle = document.getElementById('ptitle');
  const $ptitleMobile = document.getElementById('ptitleMobile');
  const $pdesc = document.getElementById('pdesc');
  const $pactions = document.getElementById('pactions');
  const $pmeta = document.getElementById('pmeta');

  // Active bonuses panel
  const $activeSummary = document.getElementById('activeSummary');
  const $activeList = document.getElementById('activeList');
  const $activeToggle = document.getElementById('activeToggle');
  const $activeBackdrop = document.getElementById('activeBackdrop');

  function isMobile(){ return window.matchMedia && window.matchMedia('(max-width: 768px)').matches; }
  function setActiveDrawer(open){
    if (!$activeToggle || !$activeBackdrop) return;
    document.body.classList.toggle('active-open', !!open);
    $activeBackdrop.classList.toggle('is-on', !!open);
    $activeToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    // simple icon swap
    const labelSpan = $activeToggle.querySelector('span');
    if (labelSpan) labelSpan.textContent = open ? 'Close' : 'Bonuses';
    $activeToggle.firstChild && ($activeToggle.firstChild.textContent = open ? '✕ ' : '☰ ');
  }

  if ($activeToggle){
    $activeToggle.addEventListener('click', () => {
      const open = !document.body.classList.contains('active-open');
      setActiveDrawer(open);
    });
  }
  if ($activeBackdrop){
    $activeBackdrop.addEventListener('click', () => setActiveDrawer(false));
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setActiveDrawer(false);
  });
  window.addEventListener('resize', () => {
    // If user rotates / switches to desktop, ensure drawer state doesn't linger
    if (!isMobile()) setActiveDrawer(false);
  });

  const data = window.SKILLTREE_DATA;
  const READ_ONLY_TREE = Boolean(window.READ_ONLY_TREE);
  const links = (data && Array.isArray(data.links)) ? data.links
    : (data && Array.isArray(data.edges)) ? data.edges
    : null;
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(links)) {
    alert('Не найдено дерево. Проверь skilltree.data.js (window.SKILLTREE_DATA = {...}).');
    return;
  }

  // ---- Character images ----
  const charImg = {
    n1: loadImage('/img/talent/char_Technomancer.webp'),
    n2: loadImage('/img/talent/char_Knight.webp'),
    n3: loadImage('/img/talent/char_Rogue.webp'),
    all: loadImage('/img/talent/char_all.webp'),
  };

  const majorNodeFrameImg = {
    active: loadImage('/img/talent/frame_node_major_active.png'),
    inactive: loadImage('/img/talent/frame_node_major_inactive.png'),
  };
  const minorNodeFrameImg = {
    active: loadImage('/img/talent/frame_node_minor_active.png'),
    inactive: loadImage('/img/talent/frame_node_minor_inactive.png'),
  };
  const keystoneNodeFrameImg = {
    active: loadImage('/img/talent/frame_node_singular_active.png'),
    inactive: loadImage('/img/talent/frame_node_singular_inactive.png'),
  };
  function loadImage(src) {
    const img = new Image();
    img.onload = () => { try { render(); } catch {} };
    img.src = src;
    return img;
  }

  const nodeIconCache = new Map();
  function getNodeIcon(src) {
    if (!src) return null;
    const cleanSrc = String(src).trim();
    if (!cleanSrc) return null;

    if (!nodeIconCache.has(cleanSrc)) {
      const img = new Image();
      img.onload = () => { try { render(); } catch {} };
      img.onerror = () => { console.warn('Failed to load node icon:', cleanSrc); };
      img.src = cleanSrc;
      nodeIconCache.set(cleanSrc, img);
    }
    return nodeIconCache.get(cleanSrc);
  }

  const START_IDS = ['n1','n2','n3'];

  // ---- Precompute bounds for character placement ----
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of data.nodes) {
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  }
  const TREE_CENTER = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };

  // ---- Character render size ----
  const CHAR_SIZE_MODE = 'world';
  const CHAR_SIZE_WORLD = 730;
  const CHAR_SIZE_PX = 730;

  function resize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }
  window.addEventListener('resize', resize);

  // ---- Camera ----
  const view = { x: 0, y: 0, z: 0.35 };

  function worldToScreen(wx, wy) {
    return {
      x: (wx - view.x) * view.z + canvas.clientWidth / 2,
      y: (wy - view.y) * view.z + canvas.clientHeight / 2,
    };
  }
  function screenToWorld(sx, sy) {
    return {
      x: (sx - canvas.clientWidth / 2) / view.z + view.x,
      y: (sy - canvas.clientHeight / 2) / view.z + view.y,
    };
  }

  // ---- Graph maps ----
  const byId = new Map();
  const neighbors = new Map();
  for (const n of data.nodes) byId.set(n.id, n);
  for (const [a,b] of links) {
    if (!neighbors.has(a)) neighbors.set(a, new Set());
    if (!neighbors.has(b)) neighbors.set(b, new Set());
    neighbors.get(a).add(b);
    neighbors.get(b).add(a);
  }

  // ---- State ----
  const LS_KEY = window.SKILLTREE_STORAGE_KEY || 'skilltree_progress_v2_no_points';
  const state = {
    unlocked: new Set(),
    startId: null,
    charPreviewId: null,
  };

  const unlockPulse = new Map();

  function save() {
    localStorage.setItem(LS_KEY, JSON.stringify({
      unlocked: [...state.unlocked],
      startId: state.startId
    }));
  }
  function load() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p.unlocked)) state.unlocked = new Set(p.unlocked);
      if (typeof p.startId === 'string') state.startId = p.startId;
    } catch {}
  }

  function isUnlocked(id) { return state.unlocked.has(id); }

  function canUnlock(id) {
    if (isUnlocked(id)) return false;
    const n = byId.get(id);
    if (!n) return false;

    // Start not chosen yet -> only start nodes are unlockable
    if (!state.startId) return START_IDS.includes(id);

    // After start chosen, other start nodes are blocked
    if (START_IDS.includes(id) && id !== state.startId) return false;

    // Need at least one unlocked neighbor
    const ns = neighbors.get(id);
    return ns ? [...ns].some(isUnlocked) : false;
  }

  // Keep only nodes reachable from startId (within unlocked set)
  function recomputeReachableFromStart() {
    if (!state.startId || !state.unlocked.has(state.startId)) return new Set();
    const vis = new Set([state.startId]);
    const q = [state.startId];
    while (q.length) {
      const cur = q.pop();
      const ns = neighbors.get(cur);
      if (!ns) continue;
      for (const nb of ns) {
        if (!state.unlocked.has(nb)) continue;
        if (vis.has(nb)) continue;
        vis.add(nb);
        q.push(nb);
      }
    }
    return vis;
  }

  // Cascade reset: if you remove a node, all nodes that become disconnected from start are removed too.
  function lockWithCascade(id) {
    if (!isUnlocked(id)) return false;

    // Clicking the chosen start node again -> full reset of the build (class unselected)
    if (id === state.startId) {
      state.unlocked.clear();
      state.startId = null;
      state.charPreviewId = null;
      save();
      updatePanel();
      render();
      return true;
    }

    state.unlocked.delete(id);

    // remove anything that is no longer connected to start
    const reachable = recomputeReachableFromStart();
    for (const uid of [...state.unlocked]) {
      if (!reachable.has(uid)) state.unlocked.delete(uid);
    }

    save();
    updatePanel();
    render(true);
    return true;
  }

  function unlock(id) {
    if (!canUnlock(id)) return false;
    state.unlocked.add(id);

    if (!state.startId && START_IDS.includes(id)) {
      state.startId = id;
      state.charPreviewId = null;
    }

    unlockPulse.set(id, performance.now());
    save();
    updatePanel();
    render(true);
    return true;
  }

  function toggleNode(id) {
    return isUnlocked(id) ? lockWithCascade(id) : unlock(id);
  }

  // ---- UI ----
  let selectedId = null;

  function nodeColor(n) {
    if (isUnlocked(n.id)) {
      if (n.type === 'keystone') return 'rgba(255,210,120,.95)';
      if (n.type === 'start') return 'rgba(160,220,255,.95)';
      if (n.type === 'square') return 'rgba(190,255,190,.95)';
      return 'rgba(190,200,255,.92)';
    }

    if (state.startId && START_IDS.includes(n.id) && n.id !== state.startId) return 'rgba(255,120,120,.55)';
    if (canUnlock(n.id)) return 'rgba(120,170,255,.85)';
    return 'rgba(110,120,150,.40)';
  }

  function edgeColor(a, b) {
    const ua = isUnlocked(a), ub = isUnlocked(b);
    if (ua && ub) return 'rgba(0,255,200,0.8)';
    if (ua || ub) return 'rgba(120,170,255,.32)';
    return 'rgba(110,120,150,.18)';
  }

  function renderCharacterWorld() {
    const key = state.startId ? state.startId : (state.charPreviewId ? state.charPreviewId : 'all');
    const img = charImg[key];
    if (!img || !img.complete) return;

    const CHARACTER_OFFSET_Y = 130;
    const p = worldToScreen(TREE_CENTER.x, TREE_CENTER.y + CHARACTER_OFFSET_Y);

    const s = (CHAR_SIZE_MODE === 'px') ? CHAR_SIZE_PX : (CHAR_SIZE_WORLD * view.z);
    const x = p.x - s / 2;
    const y = p.y - s / 2;

    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.drawImage(img, x, y, s, s);
    ctx.restore();
  }

  function render(animate=false) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // Background character
    renderCharacterWorld();

    // Edges
    ctx.lineCap = 'round';
    for (const [a, b] of links) {
      const na = byId.get(a), nb = byId.get(b);
      if (!na || !nb) continue;
      const pa = worldToScreen(na.x, na.y);
      const pb = worldToScreen(nb.x, nb.y);

      ctx.strokeStyle = edgeColor(a, b);
      ctx.lineWidth = Math.max(1, 2 * view.z);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // Nodes
    for (const n of data.nodes) {
      const p = worldToScreen(n.x, n.y);
      const r = (n.r ?? 12) * view.z;

      if (n.id === selectedId) {
        ctx.fillStyle = 'rgba(180,210,255,.18)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 10, 0, Math.PI * 2);
        ctx.fill();
      }

      const t0 = unlockPulse.get(n.id);
      if (t0 != null) {
        const dt = performance.now() - t0;
        const dur = 450;
        if (dt >= dur) {
          unlockPulse.delete(n.id);
        } else {
          const k = 1 - dt / dur;
          ctx.fillStyle = `rgba(140,190,255,${0.22 * k})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 16 * k, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = nodeColor(n);
      ctx.strokeStyle = 'rgba(10,12,18,.55)';
      ctx.lineWidth = Math.max(1, 2 * view.z);

      if (n.type === 'square') {
        const s = r * 1.35;
        ctx.beginPath();
        ctx.rect(p.x - s/2, p.y - s/2, s, s);
        ctx.fill();
        ctx.stroke();

        const icon = getNodeIcon(n.icon);
        if (icon && icon.complete && icon.naturalWidth > 0) {
          const inset = Math.max(2, s * 0.08);
          ctx.save();
          if (!isUnlocked(n.id)) ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.rect(p.x - s/2 + inset, p.y - s/2 + inset, s - inset * 2, s - inset * 2);
          ctx.clip();
          ctx.drawImage(icon, p.x - s/2 + inset, p.y - s/2 + inset, s - inset * 2, s - inset * 2);
          ctx.restore();
        }
      } else if (n.type === 'major') {
        const frameImg = isUnlocked(n.id) ? majorNodeFrameImg.active : majorNodeFrameImg.inactive;
        const frameSize = r * 3.2;
        const frameReady = frameImg && frameImg.complete && frameImg.naturalWidth > 0;

        if (frameReady) {
          ctx.drawImage(frameImg, p.x - frameSize / 2, p.y - frameSize / 2, frameSize, frameSize);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        const icon = getNodeIcon(n.icon);
        if (icon && icon.complete && icon.naturalWidth > 0) {
          const iconRadius = r * 0.92;
          const size = iconRadius * 2;
          ctx.save();
          if (!isUnlocked(n.id)) ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, iconRadius, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(icon, p.x - size / 2, p.y - size / 2, size, size);
          ctx.restore();
        }
      } else if (n.type === 'minor') {
        const frameImg = isUnlocked(n.id) ? minorNodeFrameImg.active : minorNodeFrameImg.inactive;
        const frameSize = r * 2.6;
        const frameReady = frameImg && frameImg.complete && frameImg.naturalWidth > 0;

        if (frameReady) {
          ctx.drawImage(frameImg, p.x - frameSize / 2, p.y - frameSize / 2, frameSize, frameSize);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        const icon = getNodeIcon(n.icon);
        if (icon && icon.complete && icon.naturalWidth > 0) {
          const iconRadius = r * 0.8;
          const size = iconRadius * 2;
          ctx.save();
          if (!isUnlocked(n.id)) ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, iconRadius, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(icon, p.x - size / 2, p.y - size / 2, size, size);
          ctx.restore();
        }
      } else if (n.type === 'keystone') {
        const frameImg = isUnlocked(n.id) ? keystoneNodeFrameImg.active : keystoneNodeFrameImg.inactive;
        const frameSize = r * 3.4;
        const frameReady = frameImg && frameImg.complete && frameImg.naturalWidth > 0;

        if (frameReady) {
          ctx.drawImage(frameImg, p.x - frameSize / 2, p.y - frameSize / 2, frameSize, frameSize);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        const icon = getNodeIcon(n.icon);
        if (icon && icon.complete && icon.naturalWidth > 0) {
          const iconRadius = r * 0.78;
          const size = iconRadius * 2;
          ctx.save();
          if (!isUnlocked(n.id)) ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, iconRadius, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(icon, p.x - size / 2, p.y - size / 2, size, size);
          ctx.restore();
        }
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const icon = getNodeIcon(n.icon);
        if (icon && icon.complete && icon.naturalWidth > 0) {
          const inset = Math.max(2, r * 0.12);
          const size = Math.max(0, (r - inset) * 2);
          ctx.save();
          if (!isUnlocked(n.id)) ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0, r - inset), 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(icon, p.x - size / 2, p.y - size / 2, size, size);
          ctx.restore();
        }
      }
    }

    const openedCount = state.startId ? Math.max(0, state.unlocked.size - 1) : 0;
    $stats.textContent = `Level: ${openedCount}`;

    if (animate && unlockPulse.size) requestAnimationFrame(() => render(true));
  }

  function pickNodeAt(sx, sy) {
    const w = screenToWorld(sx, sy);
    let best = null, bestD2 = Infinity;
    for (const n of data.nodes) {
      const dx = w.x - n.x, dy = w.y - n.y;
      const rr = (n.r ?? 12);
      const d2 = dx*dx + dy*dy;
      if (d2 <= rr*rr && d2 < bestD2) { best = n; bestD2 = d2; }
    }
    return best;
  }

  // ---- Hover tooltip (desktop) ----
  const $tooltip = document.getElementById('tooltip');
  const $ttTitle = $tooltip ? $tooltip.querySelector('.t-title') : null;
  const $ttDesc  = $tooltip ? $tooltip.querySelector('.t-desc') : null;
  let hoverId = null;

  function showTooltipForNode(n, sx, sy) {
    if (!$tooltip || !$ttTitle || !$ttDesc || !n) return;
    const title = (n.title && String(n.title).trim()) ? String(n.title).trim() : n.id;
    const rawDesc = (n.desc ?? n.description ?? n.info ?? n.text ?? n.tooltip ?? '');
    const desc = (rawDesc && String(rawDesc).trim()) ? String(rawDesc).trim() : 'The description is not filled yet.';

    $ttTitle.textContent = title;
    $ttDesc.textContent = desc;

    $tooltip.style.display = 'block';
    $tooltip.setAttribute('aria-hidden', 'false');

    // Position near cursor, clamp to viewport
    const pad = 12;
    const off = 14;

    const tw = $tooltip.offsetWidth;
    const th = $tooltip.offsetHeight;

    let x = sx + off;
    let y = sy + off;

    const maxX = canvas.clientWidth - tw - pad;
    const maxY = canvas.clientHeight - th - pad;

    if (x > maxX) x = Math.max(pad, sx - tw - off);
    if (y > maxY) y = Math.max(pad, sy - th - off);

    $tooltip.style.left = `${x}px`;
    $tooltip.style.top  = `${y}px`;
  }

  function hideTooltip() {
    if (!$tooltip) return;
    $tooltip.style.display = 'none';
    $tooltip.setAttribute('aria-hidden', 'true');
  }

  // ---- Active bonuses (aggregated from unlocked nodes) ----
  function normalizeBonusLine(line){
    if (!line) return null;
    const raw = String(line).replace(/\r/g, '').trim();
    if (!raw) return null;

    // Numeric bonuses: "+5 Defense", "10% increased Physical Damage"
    const m = raw.match(/^([+-]?\d+(?:\.\d+)?)(%?)\s*(.+)$/);
    if (m) {
      const num = Number(m[1]);
      if (Number.isFinite(num)) {
        const unit = m[2] || '';
        const key = String(m[3] || '').trim();
        if (key) return { kind: 'num', key, unit, value: num };
      }
    }
    return { kind: 'text', text: raw };
  }

  function formatNumber(n){
    if (Number.isInteger(n)) return String(n);
    const s = n.toFixed(2);
    return s.replace(/\.00$/, '').replace(/(\.[0-9])0$/, '$1');
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function updateActiveBonusesPanel(){
    if (!$activeSummary || !$activeList) return;

    const unlockedNonStart = [...state.unlocked].filter(id => !START_IDS.includes(id));
    if (!state.startId || unlockedNonStart.length === 0) {
      $activeSummary.textContent = 'There are no activated nodes yet.';
      $activeList.style.display = 'none';
      $activeList.innerHTML = '';
      return;
    }

    const agg = new Map(); // k -> {unit,key,sum,order}
    const order = [];
    const textSet = new Set();
    const texts = [];

    for (const id of unlockedNonStart) {
      const n = byId.get(id);
      if (!n) continue;
      const rawDesc = (n.desc ?? n.description ?? n.info ?? n.text ?? n.tooltip ?? '');
      const lines = String(rawDesc || '').split(/\n+/);
      for (const ln of lines) {
        const b = normalizeBonusLine(ln);
        if (!b) continue;

        if (b.kind === 'num') {
          const k = `${b.unit}|${b.key}`;
          if (!agg.has(k)) {
            agg.set(k, { unit: b.unit, key: b.key, sum: 0, order: order.length });
            order.push(k);
          }
          agg.get(k).sum += b.value;
        } else {
          const t = b.text;
          if (!textSet.has(t)) { textSet.add(t); texts.push(t); }
        }
      }
    }

    const items = [];
    for (const k of order) {
      const it = agg.get(k);
      if (!it) continue;
      const v = it.sum;
      if (!Number.isFinite(v) || Math.abs(v) < 1e-12) continue;
      const sign = v > 0 ? '+' : '-';
      const abs = Math.abs(v);
      items.push(`${sign}${formatNumber(abs)}${it.unit}${it.key ? ' ' + it.key : ''}`);
    }

    for (const t of texts) items.push(t);

    if (items.length === 0) {
      $activeSummary.textContent = 'There are no activated nodes yet.';
      $activeList.style.display = 'none';
      $activeList.innerHTML = '';
      return;
    }

    $activeSummary.textContent = `Activated nodes: ${unlockedNonStart.length}`;
    $activeList.style.display = 'block';
    $activeList.innerHTML = `<ul>${items.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>`;
  }

  function updatePanel() {
    if (!selectedId) {
      $ptitle.textContent = state.startId ? 'Select a node' : 'Select a character class';
      if ($ptitleMobile) $ptitleMobile.textContent = $ptitle.textContent;
     $pdesc.textContent = READ_ONLY_TREE
  ? 'Click a node to inspect it. Wheel/pinch to zoom. Drag to move.'
  : (state.startId
      ? 'Click a node to level up. Click an unlocked node again to reset the branch from that node (cascade). Wheel/pinch to zoom. Drag to move.'
      : 'First, choose a character class: Knight, Rogue, Technomancer. Click again on the chosen class to reset the whole build.');
	 $pactions.style.display = 'none';

      updateActiveBonusesPanel();
      return;
    }

    const n = byId.get(selectedId);
    const title = (n.title && String(n.title).trim()) ? String(n.title).trim() : n.id;
    const desc = (n.desc && String(n.desc).trim()) ? String(n.desc).trim() : 'The description is empty for now.';

    $ptitle.textContent = title;
    if ($ptitleMobile) $ptitleMobile.textContent = title;
    $pdesc.textContent = desc;

    const u = isUnlocked(n.id);
    const cu = canUnlock(n.id);
    const blockedStart = (state.startId && START_IDS.includes(n.id) && n.id !== state.startId);

    $pactions.style.display = 'flex';
    const status = u ? 'unlocked' : (blockedStart ? 'blocked' : (cu ? 'available' : 'locked'));

    const hint = READ_ONLY_TREE
  ? 'read only'
  : (u
      ? (n.id === state.startId ? 'click: reset ALL' : 'click: reset branch')
      : (blockedStart ? 'blocked (other class)' : (cu ? 'click: level up' : 'not available')));

    $pmeta.textContent = `type: ${n.type} • status: ${status} • ${hint}`;

    updateActiveBonusesPanel();
  }

  // ---- Events ----
  // Unified pointer events (mouse + touch). Supports:
  // - 1 finger / mouse drag: pan
  // - 2 fingers: pinch zoom (anchored at pinch midpoint)
  // - tap: select / toggle node
  const ptr = {
    active: new Map(),     // pointerId -> { sx, sy }
    last: new Map(),       // pointerId -> { sx, sy }
    tap: null,             // { id, sx, sy, t, moved }
    pinch: null,           // { dist, z0, world0:{x,y}, mid:{sx,sy} }
  };

  function localPosFromEvent(e) {
    const r = canvas.getBoundingClientRect();
    return { sx: e.clientX - r.left, sy: e.clientY - r.top };
  }
  function dist(a, b) {
    const dx = a.sx - b.sx, dy = a.sy - b.sy;
    return Math.hypot(dx, dy);
  }
  function midpoint(a, b) {
    return { sx: (a.sx + b.sx) / 2, sy: (a.sy + b.sy) / 2 };
  }

  canvas.addEventListener('pointerdown', (e) => {
    hideTooltip();
    hoverId = null;
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);

    const p = localPosFromEvent(e);
    ptr.active.set(e.pointerId, p);
    ptr.last.set(e.pointerId, p);

    // Start tap candidate only when it becomes the first active pointer
    if (ptr.active.size === 1) {
      ptr.tap = { id: e.pointerId, sx: p.sx, sy: p.sy, t: performance.now(), moved: false };
    }

    // When second finger goes down -> start pinch
    if (ptr.active.size === 2) {
      const ids = [...ptr.active.keys()];
      const a = ptr.active.get(ids[0]);
      const b = ptr.active.get(ids[1]);
      const mid = midpoint(a, b);
      ptr.pinch = {
        dist: Math.max(1, dist(a, b)),
        z0: view.z,
        mid,
        world0: screenToWorld(mid.sx, mid.sy),
      };
      ptr.tap = null;
    }
  }, { passive: false });

  canvas.addEventListener('pointermove', (e) => {
    if (!ptr.active.has(e.pointerId)) return;
    e.preventDefault();

    const p = localPosFromEvent(e);
    const prev = ptr.last.get(e.pointerId) || p;
    ptr.active.set(e.pointerId, p);
    ptr.last.set(e.pointerId, p);

    // Tap move threshold
    if (ptr.tap && ptr.tap.id === e.pointerId) {
      const mdx = p.sx - ptr.tap.sx, mdy = p.sy - ptr.tap.sy;
      if ((mdx*mdx + mdy*mdy) > 36) ptr.tap.moved = true; // 6px
    }

    if (ptr.active.size === 1 && !ptr.pinch) {
      // Pan
      const dx = p.sx - prev.sx;
      const dy = p.sy - prev.sy;
      view.x -= dx / view.z;
      view.y -= dy / view.z;
      render();
      return;
    }

    if (ptr.active.size >= 2) {
      // Pinch zoom (use the first two active pointers)
      const ids = [...ptr.active.keys()];
      const a = ptr.active.get(ids[0]);
      const b = ptr.active.get(ids[1]);
      const mid = midpoint(a, b);

      if (!ptr.pinch) {
        ptr.pinch = {
          dist: Math.max(1, dist(a, b)),
          z0: view.z,
          mid,
          world0: screenToWorld(mid.sx, mid.sy),
        };
      }

      const d = Math.max(1, dist(a, b));
      const ratio = d / ptr.pinch.dist;
      const zNew = Math.max(0.08, Math.min(2.2, ptr.pinch.z0 * ratio));

      // Anchor zoom at the current midpoint: keep the world point under midpoint stable
      const before = ptr.pinch.world0;
      view.z = zNew;
      const after = screenToWorld(mid.sx, mid.sy);
      view.x += (before.x - after.x);
      view.y += (before.y - after.y);

      render();
    }
  }, { passive: false });

  function endPointer(e) {
    if (!ptr.active.has(e.pointerId)) return;
    e.preventDefault();

    const p = localPosFromEvent(e);

	if (ptr.tap && ptr.tap.id === e.pointerId && !ptr.tap.moved && !ptr.pinch) {
	  const dt = performance.now() - ptr.tap.t;
	  if (dt < 450) {
		const n = pickNodeAt(p.sx, p.sy);
		if (!n) {
		  selectedId = null;
		  updatePanel();
		  render();
		} else {
		  if (!state.startId) state.charPreviewId = START_IDS.includes(n.id) ? n.id : null;

		  if (!READ_ONLY_TREE) {
			toggleNode(n.id);
		  }

		  selectedId = n.id;
		  updatePanel();
		  render();
		}
	  }
	}
    ptr.active.delete(e.pointerId);
    ptr.last.delete(e.pointerId);

    if (ptr.active.size < 2) ptr.pinch = null;
    if (ptr.active.size === 0) ptr.tap = null;
  }

  canvas.addEventListener('pointerup', endPointer, { passive: false });
  canvas.addEventListener('pointercancel', endPointer, { passive: false });

  // Desktop wheel zoom (still useful with mouse/trackpad)
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const before = screenToWorld(e.offsetX, e.offsetY);
    const delta = Math.sign(e.deltaY);
    view.z = Math.max(0.08, Math.min(2.2, view.z * (delta > 0 ? 0.92 : 1.08)));
    const after = screenToWorld(e.offsetX, e.offsetY);
    view.x += (before.x - after.x);
    view.y += (before.y - after.y);
    render();
  }, { passive: false });

  // Desktop convenience: double click centers the camera on a node
  canvas.addEventListener('dblclick', (e) => {
    const n = pickNodeAt(e.offsetX, e.offsetY);
    if (!n) return;
    view.x = n.x;
    view.y = n.y;
    render();
  });

  // Desktop hover: show node description next to cursor (does not interfere with touch).
  canvas.addEventListener('mousemove', (e) => {
    if (ptr.active.size) { hideTooltip(); hoverId = null; return; }

    const n = pickNodeAt(e.offsetX, e.offsetY);
    if (!n) {
      if (hoverId !== null) { hoverId = null; hideTooltip(); }
      return;
    }

    hoverId = n.id;
    showTooltipForNode(n, e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mouseleave', () => {
    hoverId = null;
    hideTooltip();
  });

if ($reset && !READ_ONLY_TREE) {
  $reset.addEventListener('click', () => {
    state.unlocked.clear();
    state.startId = null;
    state.charPreviewId = null;
    unlockPulse.clear();
    selectedId = null;
    save();
    updatePanel();
    render();
  });
}

  load();

  // Sanity: if start exists, ensure it's unlocked
  if (state.startId && byId.has(state.startId)) state.unlocked.add(state.startId);

  // Also enforce: at most one start node unlocked
  if (!state.startId) {
    const openedStarts = START_IDS.filter(id => state.unlocked.has(id));
    if (openedStarts.length === 1) state.startId = openedStarts[0];
    if (openedStarts.length > 1) {
      state.startId = openedStarts[0];
      for (const id of openedStarts.slice(1)) state.unlocked.delete(id);
    }
  }

  save();
  resize();
  updatePanel();
  render();
})();

(() => {
  // Mobile bottom sheet behavior (only on <= 768px)
  const isMobile = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  const sheet = document.getElementById("panel");
  const header = document.getElementById("sheetHeader");
  const content = document.getElementById("sheetContent");
  const backdrop = document.getElementById("sheetBackdrop");
  if (!sheet || !header || !content || !backdrop) return;

  // Snap heights in px (visible part of sheet)
  const COLLAPSED = 96;              // shows handle + title
  const MID_RATIO = 0.45;            // 45vh
  const FULL_RATIO = 0.85;           // 85vh (matches CSS height)

  let state = "collapsed"; // collapsed | mid | full
  let sheetH = 0;
  let yCollapsed = 0, yMid = 0, yFull = 0;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function recalc() {
    const vh = window.innerHeight;
    sheetH = sheet.getBoundingClientRect().height;

    const midVisible = Math.round(vh * MID_RATIO);
    const fullVisible = Math.round(vh * FULL_RATIO);

    // TranslateY values (how much sheet is pushed down)
    yFull = Math.max(0, sheetH - fullVisible);
    yMid  = clamp(sheetH - midVisible, yFull, sheetH - COLLAPSED);
    yCollapsed = sheetH - COLLAPSED;

    apply(state, true);
  }

  function setBackdrop(on){
    backdrop.classList.toggle("is-on", on);
  }

  function apply(next, immediate=false) {
    state = next;

    let y = yCollapsed;
    if (state === "mid") y = yMid;
    if (state === "full") y = yFull;

    if (immediate) {
      const prev = sheet.style.transition;
      sheet.style.transition = "none";
      sheet.style.setProperty("--sheetY", `${y}px`);
      sheet.offsetHeight; // force reflow
      sheet.style.transition = prev;
    } else {
      sheet.style.setProperty("--sheetY", `${y}px`);
    }

    setBackdrop(state !== "collapsed");

    // Lock content scrolling when collapsed to avoid "scroll stealing"
    content.style.pointerEvents = (state === "collapsed") ? "none" : "auto";
  }

  backdrop.addEventListener("click", () => apply("collapsed"));

  header.addEventListener("click", () => {
    if (state === "collapsed") apply("mid");
    else apply("collapsed");
  });

  // Drag logic (pointer events)
  let dragging = false;
  let startY = 0;
  let startSheetY = 0;
  let lastY = 0;
  let lastT = 0;
  let velocity = 0; // px/ms

  function getCurrentY() {
    const val = getComputedStyle(sheet).getPropertyValue("--sheetY").trim();
    const n = parseFloat(val.replace("px",""));
    return Number.isFinite(n) ? n : 0;
  }

  function onDown(ev) {
    const target = ev.target;
    const inHeader = header.contains(target);
    const inContent = content.contains(target);

    if (!inHeader && !inContent) return;

    if (inContent) {
      if (content.scrollTop > 0) return;
    }

    dragging = true;
    sheet.classList.add("is-dragging");
    sheet.setPointerCapture?.(ev.pointerId);

    startY = ev.clientY;
    startSheetY = getCurrentY();
    lastY = ev.clientY;
    lastT = performance.now();
    velocity = 0;

    ev.preventDefault();
    ev.stopPropagation();
  }

  function onMove(ev) {
    if (!dragging) return;

    const now = performance.now();
    const dy = ev.clientY - startY;
    const y = clamp(startSheetY + dy, yFull, yCollapsed);

    const dt = now - lastT;
    if (dt > 0) velocity = (ev.clientY - lastY) / dt;

    lastY = ev.clientY;
    lastT = now;

    sheet.style.setProperty("--sheetY", `${y}px`);
    setBackdrop(y < yCollapsed - 1);

    ev.preventDefault();
    ev.stopPropagation();
  }

  function nearestSnap(y) {
    const v = velocity;

    if (v > 0.8) return "collapsed";
    if (v < -0.8) return "full";

    const dC = Math.abs(y - yCollapsed);
    const dM = Math.abs(y - yMid);
    const dF = Math.abs(y - yFull);
    const min = Math.min(dC, dM, dF);
    if (min === dF) return "full";
    if (min === dM) return "mid";
    return "collapsed";
  }

  function onUp(ev) {
    if (!dragging) return;
    dragging = false;
    sheet.classList.remove("is-dragging");

    const y = getCurrentY();
    apply(nearestSnap(y));

    ev.preventDefault();
    ev.stopPropagation();
  }

  sheet.addEventListener("pointerdown", onDown, { passive: false });
  sheet.addEventListener("pointermove", onMove, { passive: false });
  sheet.addEventListener("pointerup", onUp, { passive: false });
  sheet.addEventListener("pointercancel", onUp, { passive: false });

  window.addEventListener("resize", recalc);
  window.addEventListener("orientationchange", recalc);

  recalc();
  apply("collapsed", true);

  window.__sheet = { apply, recalc };
})();
