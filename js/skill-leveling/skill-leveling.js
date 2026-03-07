(() => {

  const SKILLS = (window.SKILL_DB && Array.isArray(window.SKILL_DB.skills)) ? window.SKILL_DB.skills : [];
  if (!SKILLS.length){
    console.error("[skill-leveling] SKILL_DB not loaded or empty. Проверь: skill-db.js подключён ПЕРЕД skill-leveling.js и путь ./js/skill-leveling/skill-db.js верный.");
  }

  const RARITIES = {
    common:    { label:"Common" },
    rare:      { label:"Rare" },
    legendary: { label:"Legendary" },
    mythic: { label:"Mythic" }
  };


  function normalizeCategories(v){
    if (!v) return [];
    if (Array.isArray(v)) return v.filter(Boolean).map(String);
    return [String(v)];
  }

  function getGlitchesForSkill(skill){
    const skillCats = new Set(normalizeCategories(skill?.categories));
    if (!skillCats.size) return [];

    const byCategory = window.GLITCH_DB && window.GLITCH_DB.byCategory;
    if (!byCategory) return [];

    const out = [];
    const seen = new Set();

    for (const cat of skillCats){
      const list = Array.isArray(byCategory[cat]) ? byCategory[cat] : [];
      for (const g of list){
        if (!g || !g.id) continue;
        const gCats = new Set(normalizeCategories(g.categories || g.category || g.tag));
        let ok = false;
        for (const sc of skillCats){ if (gCats.has(sc)) { ok = true; break; } }
        if (!ok) continue;

        if (seen.has(g.id)) continue;
        seen.add(g.id);
        out.push(g);
      }
    }
    return out;
  }


  function glitchSvgDataUri(text, bg1, bg2){
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${bg1}"/>
            <stop offset="1" stop-color="${bg2}"/>
          </linearGradient>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0.2"/>
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.25"/>
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="256" height="256" rx="44" fill="url(#g)"/>
        <rect width="256" height="256" rx="44" filter="url(#noise)" opacity=".55"/>
        <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
              font-family="system-ui,Segoe UI,Roboto,Arial" font-size="110" fill="rgba(255,255,255,.92)">${text}</text>
      </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }



  const GLITCH_TARGET_NODE = {
    common: 'l2b',
    rare: 'l4c',
    legendary: 'l6b',
    mythic: 'mythicTop'
  };


  const LINE_BUTTON_MAX_LEVEL = {
    common: 1,
    rare: 3,
    legendary: 5,
    mythic: 7,
  };


  const nodeTraits = new Map();

  function getNodeDisplayData(id){
    const base = (currentSkill.nodes && currentSkill.nodes[id]) || { title: id, desc: 'Description not specified. We will update soon.' };
    const trait = nodeTraits.get(id);
    if (!trait) return base;
    return {
      title: (base.title ? (base.title + ' • ' + trait.title) : trait.title),
      desc: trait.desc || base.desc || '—',
    };
  }

  function pickRandom(arr){
    if (!arr || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getNodeIdsByLevel(level){
    return nodes.filter(n => n.level === level).map(n => n.id);
  }

  function rerollTraitsForLevel(level){
    const pool = LINE_TRAIT_POOLS[level] || [];
    if (!pool.length) return;

    const ids = getNodeIdsByLevel(level);
    for (const id of ids){
      if (id === 'bottom') continue;
      if (!isEnabledByRarity(id)) continue;
      if (id === GLITCH_TARGET_NODE[currentRarity]) continue;
      nodeTraits.set(id, pickRandom(pool));
    }

    renderUpgradedCard();
  }


  function shuffleInPlace(arr){
    for (let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function cloneModifiers(mod){
    if (!mod || typeof mod !== 'object') return mod;
    if (typeof structuredClone === 'function') return structuredClone(mod);
    return JSON.parse(JSON.stringify(mod));
  }

  function shuffleNodesInLevel(level){
    const ids = getNodeIdsByLevel(level).filter(id => {
      if (id === 'bottom') return false;
      if (!isEnabledByRarity(id)) return false;


      if (id === GLITCH_TARGET_NODE[currentRarity]) return false;

      const node = currentSkill?.nodes?.[id];
      if (!node) return false;
      return true;
    });

    if (ids.length < 2) return;


    const payloads = ids.map(id => {
      const node = currentSkill.nodes[id] || {};
      return {
        title: node.title,
        desc: node.desc,
        modifiers: cloneModifiers(node.modifiers),
      };
    });

    shuffleInPlace(payloads);


    ids.forEach((id, idx) => {
      const node = currentSkill.nodes[id];
      const p = payloads[idx];
      node.title = p.title;
      node.desc = p.desc;
      if (p.modifiers !== undefined) node.modifiers = p.modifiers;
      else delete node.modifiers;
    });


    renderUpgradedCard();


  }


  const lineButtons = new Map(); 

  function ensureLineButtons(){
    
    let host = document.getElementById('lineButtons');
    if (!host){
      host = document.createElement('div');
      host.id = 'lineButtons';
      host.className = 'lineButtons';
      (stageEl || treeEl).appendChild(host);
    }


    const maxLevel = LINE_BUTTON_MAX_LEVEL[currentRarity] ?? 0;


    for (const [lvl, btn] of Array.from(lineButtons.entries())){
      if (lvl > maxLevel){
        btn.remove();
        lineButtons.delete(lvl);
      }
    }


    for (let lvl = 1; lvl <= maxLevel; lvl++){
      if (lineButtons.has(lvl)) continue;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lineBtn';
      btn.title = 'Change node line characteristics (random)';
      btn.setAttribute('aria-label', 'Change the characteristics of the line nodes');
      btn.dataset.level = String(lvl);
      btn.innerHTML = '↻';

      btn.addEventListener('click', () => {
        shuffleNodesInLevel(lvl);
      });

      host.appendChild(btn);
      lineButtons.set(lvl, btn);
    }
  }

  function layoutLineButtons(){
    if (!treeEl) return;
    const { rect, cx, cy } = getTreeCenter();


    const yOffset = getYOffset();

    const maxLevel = LINE_BUTTON_MAX_LEVEL[currentRarity] ?? 0;
    for (let lvl = 1; lvl <= maxLevel; lvl++){
      const btn = lineButtons.get(lvl);
      if (!btn) continue;


      const levelNodes = nodes
        .filter(n => n.level === lvl)
        .filter(n => isEnabledByRarity(n.id));

      if (!levelNodes.length){
        btn.style.display = 'none';
        continue;
      }


let anchor = null;

if (currentRarity === 'legendary'){
  if (lvl === 4) anchor = nodesById.get('l4d');
  if (lvl === 5) anchor = nodesById.get('l5c');
}


if (!anchor){
  anchor = levelNodes.reduce((acc, n) => (n.x > acc.x ? n : acc), levelNodes[0]);
}

const x = cx + (anchor.x || 0) * stepX;
const y = cy + (anchor.y || 0) * stepY + yOffset;

btn.style.display = 'grid';


const btnHalf = (btn.offsetWidth || 34) / 2;

const nodeEl = elById.get(anchor.id);
const nodeHalf = (nodeEl?.offsetWidth || 74) / 2;


const gap = 10;


const left = x + nodeHalf + gap + btnHalf;

btn.style.left = left + 'px';
btn.style.top  = y + 'px';
    }
  }

  function isActiveGlitchSlot(nodeId){
    return GLITCH_TARGET_NODE[currentRarity] === nodeId;
  }

  function clearAllGlitchSlots(){
    const ids = ['l2b','l4c','l6b','l7a','l7b','mythicTop'];
    for (const id of ids){
      const el = elById.get(id);
      if (!el) continue;
      const inner = el.querySelector('.inner');
      if (inner) inner.remove();
      appliedGlitches.delete(id);
    }
  }

  function ensureInner(el, kind){

    if (!el) return null;
    let inner = el.querySelector('.inner');
    if (!inner){
      inner = document.createElement('div');
      inner.className = 'inner';
      el.appendChild(inner);
    }
    inner.classList.toggle('square', kind === 'square');
    inner.classList.toggle('hex', kind === 'hex');
    return inner;
  }

  function removeInner(el){
    const inner = el?.querySelector?.('.inner');
    if (inner) inner.remove();
  }


  function syncNodeInnersForRarity(){

    const bottomEl = elById.get('bottom');
    if (bottomEl){
      const inner = ensureInner(bottomEl, 'square');
      if (inner && !inner.querySelector('#bottomSkillImg')){
        inner.innerHTML = `<img id="bottomSkillImg" alt="" />`;
      }
    }


    const targetId = GLITCH_TARGET_NODE[currentRarity];
    for (const n of nodes){
      if (n.id === 'bottom' || n.id === targetId) continue;
      const el = elById.get(n.id);
      if (!el) continue;
      removeInner(el);
    }


    const targetEl = elById.get(targetId);
    if (targetEl){
      const inner = ensureInner(targetEl, 'hex');

      if (!appliedGlitches.has(targetId)){
        inner.innerHTML = '';
      }
    }
  }




  const ENABLED_BY_RARITY = {
  common: new Set(['bottom','l1a','l1b','l2b']),
  rare: new Set(['bottom','l1a','l1b','l2a','l2b','l2c','l3b','l3c','l4c']),

  legendary: new Set([
    'bottom','l1a','l1b',
    'l2a','l2b','l2c',
    'l3a','l3b','l3c','l3d',
    'l4a','l4b','l4c','l4d','l4e',
    'l5a','l5b','l5c','l5d',
    'l6a','l6b','l6c',
  ]),

  mythic: null 
};

  function isEnabledByRarity(id){
    const set = ENABLED_BY_RARITY[currentRarity];
    if (!set) return true;
    return set.has(id);
  }


  

const nodes = [

  { id:'mythicTop',    label:'', level:8, x: 0, y:0, special:true },


  { id:'l7a', label:'1', level:7, x:-1, y:1 },
  { id:'l7b', label:'1', level:7, x: 1, y:1 },


  { id:'l6a', label:'1', level:6, x:-2, y:2 },
  { id:'l6b', label:'1', level:6, x: 0, y:2 },
  { id:'l6c', label:'1', level:6, x: 2, y:2 },


  { id:'l5a', label:'1', level:5, x:-3, y:3 },
  { id:'l5b', label:'1', level:5, x:-1, y:3 },
  { id:'l5c', label:'1', level:5, x: 1, y:3 },
  { id:'l5d', label:'1', level:5, x: 3, y:3 },


  { id:'l4a', label:'1', level:4, x:-4, y:4 },
  { id:'l4b', label:'1', level:4, x:-2, y:4 },
  { id:'l4c', label:'1', level:4, x: 0, y:4 },
  { id:'l4d', label:'1', level:4, x: 2, y:4 },
  { id:'l4e', label:'1', level:4, x: 4, y:4 },


  { id:'l3a', label:'1', level:3, x:-3, y:5 },
  { id:'l3b', label:'1', level:3, x:-1, y:5 },
  { id:'l3c', label:'1', level:3, x: 1, y:5 },
  { id:'l3d', label:'1', level:3, x: 3, y:5 },


  { id:'l2a', label:'1', level:2, x:-2, y:6 },
  { id:'l2b', label:'1', level:2, x: 0, y:6 },
  { id:'l2c', label:'1', level:2, x: 2, y:6 },


  { id:'l1a', label:'', level:1, x:-1, y:7 },
  { id:'l1b', label:'', level:1, x: 1, y:7 },

  { id:'bottom', label:'', level:0, x: 0, y:8, special:true },
];


  



const EDGES_LEGENDARY = [

  ['bottom','l1a'], ['bottom','l1b'],


  ['l1a','l2a'], ['l1a','l2b'],
  ['l1b','l2b'], ['l1b','l2c'],


  ['l2a','l3a'], ['l2a','l3b'],
  ['l2b','l3b'], ['l2b','l3c'],
  ['l2c','l3c'], ['l2c','l3d'],


  ['l3a','l4b'],
  ['l3b','l4b'], ['l3b','l4c'],
  ['l3c','l4c'], ['l3c','l4d'],
  ['l3d','l4d'],


  ['l4b','l5b'],
  ['l4c','l5b'], ['l4c','l5c'],
  ['l4d','l5c'],


  ['l5b','l6b'],
  ['l5c','l6b'],

];


const EDGES_MYTHIC = [

  ['bottom','l1a'], ['bottom','l1b'],


  ['l1a','l2a'], ['l1a','l2b'],
  ['l1b','l2b'], ['l1b','l2c'],


  ['l2a','l3a'], ['l2a','l3b'],
  ['l2b','l3b'], ['l2b','l3c'],
  ['l2c','l3c'], ['l2c','l3d'],


  ['l3a','l4a'], ['l3a','l4b'],
  ['l3b','l4b'], ['l3b','l4c'],
  ['l3c','l4c'], ['l3c','l4d'],
  ['l3d','l4d'], ['l3d','l4e'],


  ['l4a','l5a'],
  ['l4b','l5a'], ['l4b','l5b'],
  ['l4c','l5b'], ['l4c','l5c'],
  ['l4d','l5c'], ['l4d','l5d'],
  ['l4e','l5d'],


  ['l5a','l6a'],
  ['l5b','l6a'], ['l5b','l6b'],
  ['l5c','l6b'], ['l5c','l6c'],
  ['l5d','l6c'],


  ['l6a','l7a'],
  ['l6b','l7a'], ['l6b','l7b'],
  ['l6c','l7b'],


  ['l7a','mythicTop'], ['l7b','mythicTop'],
];

function getEdgesForRarity(rarity){
  return (rarity === 'mythic') ? EDGES_MYTHIC : EDGES_LEGENDARY;
}

let edges = [];

  const treeEl  = document.getElementById('tree');
  const stageEl = document.getElementById('stage');
  const nodesEl = document.getElementById('nodes');
  const linesEl = document.getElementById('lines');

  const skillSelect   = document.getElementById('skillSelect');
  const raritySelect  = document.getElementById('raritySelect');
  const skillIconImg  = document.getElementById('skillIconImg');
  const skillNameEl   = document.getElementById('skillName');
  const rarityPill    = document.getElementById('skillRarityPill');
  const skillIdPill   = document.getElementById('skillIdPill');
  const glitchListEl  = document.getElementById('glitchList');


  const upgradedListEl = document.getElementById('upgradedList');
  const upgradedCountEl = document.getElementById('upgradedCount');
  const upgradedEmptyEl = document.getElementById('upgradedEmpty');


  const tooltipEl = document.getElementById('tooltip');
  const tooltipTitleEl = document.getElementById('tooltipTitle');
  const tooltipDescEl  = document.getElementById('tooltipDesc');

  const TOOLTIP_OFFSET = { x: 14, y: 14 };

  function showTooltipForNode(id){
    const data = getNodeDisplayData(id) || { title:"Node", desc:"Description coming soon" };
    tooltipTitleEl.textContent = data.title || "Node";
    tooltipDescEl.textContent  = data.desc  || "—";
    tooltipEl.classList.add('show');
    tooltipEl.setAttribute('aria-hidden', 'false');
  }
  function showTooltipForGlitch(g){
    tooltipTitleEl.textContent = g?.name || "Crest";
    tooltipDescEl.textContent  = g?.desc || "—";
    tooltipEl.classList.add('show');
    tooltipEl.setAttribute('aria-hidden', 'false');
  }


  function hideTooltip(){
    tooltipEl.classList.remove('show');
    tooltipEl.setAttribute('aria-hidden', 'true');
  }

  function moveTooltip(clientX, clientY){
    const pad = 10;


    const vv = window.visualViewport;
    const vw = vv ? vv.width : window.innerWidth;
    const vh = vv ? vv.height : window.innerHeight;
    const offsetLeft = vv ? vv.offsetLeft : 0;
    const offsetTop  = vv ? vv.offsetTop  : 0;


    const r = tooltipEl.getBoundingClientRect();

    let x = clientX + TOOLTIP_OFFSET.x;
    let y = clientY + TOOLTIP_OFFSET.y;


    if (x + r.width + pad > offsetLeft + vw)  x = clientX - r.width - TOOLTIP_OFFSET.x;
    if (y + r.height + pad > offsetTop + vh)  y = clientY - r.height - TOOLTIP_OFFSET.y;


    const minX = offsetLeft + pad;
    const minY = offsetTop + pad;
    const maxX = offsetLeft + vw - r.width - pad;
    const maxY = offsetTop + vh - r.height - pad;

    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));

    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top  = y + 'px';
  }



const SIDE_GUTTER = 120; 

  const CSS = getComputedStyle(document.documentElement);
  const stepX = parseFloat(CSS.getPropertyValue('--stepX')) || 110;
  const stepY = parseFloat(CSS.getPropertyValue('--stepY')) || 92;

function getTreeCenter(){
  const rect = treeEl.getBoundingClientRect();

  const availableW = rect.width - SIDE_GUTTER * 2;
  const cx = SIDE_GUTTER + (availableW / 2);
  const cy = rect.height / 2;
  return { rect, cx, cy };
}

  function getYOffset(){
    const maxY = Math.max(...nodes.map(n => n.y || 0));
    return -stepY * (maxY / 2);
  }


  const nodesById = new Map(nodes.map(n => [n.id, n]));
  const elById = new Map();           
  const selectedByLevel = new Map();   


  const appliedGlitches = new Map();

  const STORAGE_KEY = 'crystalfall_skill_leveling_v1';

  function createEmptySkillState(){
    return {
      rarity: raritySelect?.value || 'common',
      byRarity: {}
    };
  }

  function readStoredState(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { currentSkillId: '', skills: {} };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return { currentSkillId: '', skills: {} };
      if (!parsed.skills || typeof parsed.skills !== 'object') parsed.skills = {};
      return parsed;
    } catch (err) {
      console.warn('[skill-leveling] Failed to read saved state:', err);
      return { currentSkillId: '', skills: {} };
    }
  }

  function writeStoredState(state){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('[skill-leveling] Failed to save state:', err);
    }
  }

  function ensureStoredSkillState(rootState, skillId){
    if (!rootState.skills[skillId] || typeof rootState.skills[skillId] !== 'object'){
      rootState.skills[skillId] = createEmptySkillState();
    }
    if (!rootState.skills[skillId].byRarity || typeof rootState.skills[skillId].byRarity !== 'object'){
      rootState.skills[skillId].byRarity = {};
    }
    return rootState.skills[skillId];
  }

  function clearSelectedNodes(){
    for (const n of nodes){
      if (n.id === 'bottom') continue;
      elById.get(n.id)?.classList.remove('selected');
    }
    selectedByLevel.clear();
    selectedByLevel.set(0, 'bottom');
    elById.get('bottom')?.classList.add('selected');
  }

  function clearAppliedGlitchesState(){
    appliedGlitches.clear();
    clearAllGlitchSlots();
    syncNodeInnersForRarity();
  }

  function saveCurrentSkillState(){
    if (!currentSkill?.id) return;

    const rootState = readStoredState();
    const skillState = ensureStoredSkillState(rootState, currentSkill.id);
    skillState.rarity = currentRarity;

    const selectedNodeIds = getUpgradedNodeIds().filter(id => id !== 'bottom');
    const glitchEntries = [];
    for (const [nodeId, glitch] of appliedGlitches.entries()){
      if (!glitch?.id) continue;
      glitchEntries.push({ nodeId, glitchId: glitch.id });
    }

    skillState.byRarity[currentRarity] = {
      selectedNodeIds,
      glitchEntries
    };

    rootState.currentSkillId = currentSkill.id;
    writeStoredState(rootState);
  }

  function restoreCurrentSkillState(){
    clearSelectedNodes();
    clearAppliedGlitchesState();

    if (!currentSkill?.id) {
      refreshLocks();
      renderUpgradedCard();
      return;
    }

    const rootState = readStoredState();
    const skillState = rootState.skills?.[currentSkill.id];
    const rarityState = skillState?.byRarity?.[currentRarity];
    const savedNodeIds = Array.isArray(rarityState?.selectedNodeIds) ? rarityState.selectedNodeIds : [];

    const sortedIds = [...savedNodeIds].sort((a, b) => {
      const na = nodesById.get(a);
      const nb = nodesById.get(b);
      if (!na || !nb) return 0;
      if (na.level !== nb.level) return na.level - nb.level;
      return (na.x ?? 0) - (nb.x ?? 0);
    });

    refreshLocks();

    for (const id of sortedIds){
      const nodeMeta = nodesById.get(id);
      const el = elById.get(id);
      if (!nodeMeta || !el) continue;
      if (!isEnabledByRarity(id)) continue;
      if (!canUnlock(id)) continue;

      const prevId = selectedByLevel.get(nodeMeta.level);
      if (prevId && prevId !== id){
        elById.get(prevId)?.classList.remove('selected');
      }

      el.classList.add('selected');
      selectedByLevel.set(nodeMeta.level, id);
      refreshLocks();
    }

    const glitchEntries = Array.isArray(rarityState?.glitchEntries) ? rarityState.glitchEntries : [];
    const availableGlitches = getGlitchesForSkill(currentSkill);
    const glitchesById = new Map(availableGlitches.map(g => [g.id, g]));

    for (const entry of glitchEntries){
      const nodeId = entry?.nodeId;
      const glitchId = entry?.glitchId;
      if (!nodeId || !glitchId) continue;
      if (!isActiveGlitchSlot(nodeId)) continue;
      if (!isUpgraded(nodeId)) continue;

      const glitch = glitchesById.get(glitchId);
      const nodeEl = elById.get(nodeId);
      if (!glitch || !nodeEl) continue;

      const inner = ensureInner(nodeEl, 'hex');
      inner.innerHTML = '';
      const img = document.createElement('img');
      img.src = glitch.image;
      img.alt = glitch.name;
      inner.appendChild(img);
      appliedGlitches.set(nodeId, glitch);
    }

    pruneInvalidSelections();
    refreshLocks();
    renderUpgradedCard();
  }


const parentsById = new Map();  
function rebuildParentsGraph(){
  parentsById.clear();
  nodes.forEach(n => parentsById.set(n.id, []));
  for (const [p,c] of edges){
    if (!parentsById.has(c)) parentsById.set(c, []);
    parentsById.get(c).push(p);
  }
}


  let currentSkill = SKILLS[0] || { id:"", name:"—", image:"", categories:[], nodes:{} };
  let currentRarity = raritySelect.value;
  edges = getEdgesForRarity(currentRarity);
  rebuildParentsGraph();
  function isUpgraded(id){
    const el = elById.get(id);
    if (!el) return false;
    return el.classList.contains('selected') || el.classList.contains('fixed');
  }


  function calculateFinalStats(){
    const base = structuredClone(currentSkill?.baseStats || {});

    const isNumber = (v) => (typeof v === 'number' && Number.isFinite(v));
    const COST_KEYS = new Set(['costFlat','costPercent']);
    const GAIN_KEYS = new Set(['previousNodeGainPercent','nextNodeGainPercent']);

    const NO_GAIN_AMPLIFY_KEYS = new Set(['skillLevelFlat']);


    const upgradedIds = (() => {
      const ids = getUpgradedNodeIds();

      const target = GLITCH_TARGET_NODE[currentRarity];
      const hasGlitchInTarget = target && appliedGlitches.has(target) && isUpgraded(target) && isEnabledByRarity(target);
      if (hasGlitchInTarget && !ids.includes(target)) ids.push(target);


      ids.sort((a,b) => {
        const na = nodesById.get(a);
        const nb = nodesById.get(b);
        if (!na || !nb) return 0;
        if (na.level !== nb.level) return na.level - nb.level;
        return (na.x ?? 0) - (nb.x ?? 0);
      });
      return ids;
    })();


    const getActiveNodeIdAtLevel = (lvl) => {
      if (selectedByLevel.has(lvl)) return selectedByLevel.get(lvl);
      const candidates = upgradedIds.filter(uid => (nodesById.get(uid)?.level === lvl));
      return (candidates.length === 1) ? candidates[0] : null;
    };



    const effective = new Map(); 
    for (const id of upgradedIds){
      const out = {};

      const m = currentSkill?.nodes?.[id]?.modifiers;
      if (m && typeof m === 'object') Object.assign(out, m);


      const g = isActiveGlitchSlot(id) ? appliedGlitches.get(id) : null;
      const gm = g?.modifiers;
      if (gm && typeof gm === 'object'){
        for (const [k,v] of Object.entries(gm)){
          if (typeof v !== 'number' || !Number.isFinite(v) || v === 0) continue;
          out[k] = (typeof out[k] === 'number' && Number.isFinite(out[k])) ? (out[k] + v) : v;
        }
      }

      if (Object.keys(out).length) effective.set(id, out);
    }


    for (const id of upgradedIds){
      const node = nodesById.get(id);
      const m = effective.get(id);
      if (!node || !m) continue;

      const pct = m.previousNodeGainPercent;
      if (!isNumber(pct) || pct === 0) continue;

      const prevId = getActiveNodeIdAtLevel(node.level - 1);
      if (!prevId) continue;

      const prevM = effective.get(prevId);
      if (!prevM) continue;

      const k = 1 + (pct / 100);
      for (const [key, val] of Object.entries(prevM)){
        if (COST_KEYS.has(key)) continue;      
        if (GAIN_KEYS.has(key)) continue;      
        if (NO_GAIN_AMPLIFY_KEYS.has(key)) continue; 
        if (!isNumber(val)) continue;
        prevM[key] = val * k;
      }
    }



    for (const id of upgradedIds){
      const node = nodesById.get(id);
      const m = effective.get(id);
      if (!node || !m) continue;

      const pct = m.nextNodeGainPercent;
      if (!isNumber(pct) || pct === 0) continue;

      const nextId = getActiveNodeIdAtLevel(node.level + 1);
      if (!nextId) continue;

      const nextM = effective.get(nextId);
      if (!nextM) continue;

      const k = 1 + (pct / 100);
      for (const [key, val] of Object.entries(nextM)){
        if (COST_KEYS.has(key)) continue;     
        if (GAIN_KEYS.has(key)) continue;     
        if (NO_GAIN_AMPLIFY_KEYS.has(key)) continue; 
        if (!isNumber(val)) continue;
        nextM[key] = val * k;
      }
    }


    const multPct = {
      castSpeedPercent: 0,
      aoeRadiusPercent: 0,
      cooldownPercent: 0,
      durationPercent: 0,
      rangePercent: 0,
      damagePercent: 0,
	  dazzleDurationPercent: 0
    };


    for (const m of effective.values()){
      for (const [key, val] of Object.entries(m)){
        if (!isNumber(val) || val === 0) continue;

        if (key === 'costFlat')        { base.costFlat = (base.costFlat || 0) + val; continue; }
        if (key === 'costPercent')     { base.costPercent = (base.costPercent || 0) + val; continue; }
        if (GAIN_KEYS.has(key))        { continue; }

        if (key === 'castSpeedPercent'){ multPct.castSpeedPercent += val; continue; }
        if (key === 'aoeRadiusPercent'){ multPct.aoeRadiusPercent += val; continue; }
        if (key === 'cooldownPercent'){ multPct.cooldownPercent += val; continue; }
        if (key === 'durationPercent'){ multPct.durationPercent += val; continue; }
        if (key === 'rangePercent'){ multPct.rangePercent += val; continue; }
        if (key === 'damagePercent'){ multPct.damagePercent += val; continue; }
		if (key === 'dazzleDurationPercent'){
  multPct.dazzleDurationPercent += val;
  continue;
}


        if (Object.prototype.hasOwnProperty.call(base, key)){
          base[key] = (base[key] || 0) + val;
        } else {
          base[key] = val;
        }
      }
    }


    if (isNumber(base.castSpeed) && multPct.castSpeedPercent){
      base.castSpeed = base.castSpeed * (1 + multPct.castSpeedPercent / 100);
    }
    if (isNumber(base.aoeRadius) && multPct.aoeRadiusPercent){
      base.aoeRadius = base.aoeRadius * (1 + multPct.aoeRadiusPercent / 100);
    }
    if (isNumber(base.cooldown) && multPct.cooldownPercent){
      base.cooldown = base.cooldown * (1 + multPct.cooldownPercent / 100);
    }
    if (isNumber(base.duration) && multPct.durationPercent){
      base.duration = base.duration * (1 + multPct.durationPercent / 100);
    }
    if (isNumber(base.range) && multPct.rangePercent){
      base.range = base.range * (1 + multPct.rangePercent / 100);
    }
	if (isNumber(base.dazzleDuration) && multPct.dazzleDurationPercent){
	  base.dazzleDuration =
		base.dazzleDuration * (1 + multPct.dazzleDurationPercent / 100);
	}
    if (multPct.damagePercent){
      if (isNumber(base.damageMin)) base.damageMin = base.damageMin * (1 + multPct.damagePercent / 100);
      if (isNumber(base.damageMax)) base.damageMax = base.damageMax * (1 + multPct.damagePercent / 100);
    }


    const nodeCount = nodes
      .filter(n => n.id !== 'bottom')
      .filter(n => isEnabledByRarity(n.id))
      .filter(n => isUpgraded(n.id))
      .length;
    const bonusSkillLevels = (isNumber(base.skillLevelFlat) ? base.skillLevelFlat : 0);
    const skillLevels = 1 + nodeCount + bonusSkillLevels;


    base.skillLevels = skillLevels;

if (isNumber(base.extraDamagePerLevel) && base.extraDamagePerLevel !== 0){
  const multiplier = 1 + (skillLevels * base.extraDamagePerLevel / 100);
  if (isNumber(base.damageMin)) base.damageMin = base.damageMin * multiplier;
  if (isNumber(base.damageMax)) base.damageMax = base.damageMax * multiplier;
}


    const per10 = Math.floor(skillLevels / 10);
    if (per10 > 0){
      for (const [key, val] of Object.entries(base)){
        if (!isNumber(val) || val === 0) continue;
        if (/Per10SkillLevelFlat$/.test(key)){
          const targetKey = key.replace(/Per10SkillLevelFlat$/, 'Flat');
          base[targetKey] = (isNumber(base[targetKey]) ? base[targetKey] : 0) + (val * per10);

          base[key] = val * per10;
        }
      }
    } else {

      for (const [key, val] of Object.entries(base)){
        if (/Per10SkillLevelFlat$/.test(key) && isNumber(val)){
          base[key] = 0;
        }
      }
    }



    for (const [key, val] of Object.entries(base)){
      if (!isNumber(val) || val === 0) continue;
      if (/PerLevelPercent$/.test(key)){
        base[key] = val * skillLevels;
      }
    }
	
	function applyModifier(stats, key, value) {


  stats[key] = (stats[key] || 0) + value
}


    return base;
  }


  
  function getUpgradedNodeIds(){

    const hiddenUntilGlitch = GLITCH_TARGET_NODE[currentRarity];

    const upgraded = [];
    for (const n of nodes){
      const el = elById.get(n.id);
      if (!el) continue;

      const isUpg = el.classList.contains('selected') || el.classList.contains('fixed');
      if (!isUpg) continue;


      if (!isEnabledByRarity(n.id)) continue;


      if (n.id === hiddenUntilGlitch) continue;

upgraded.push(n.id);
    }


    upgraded.sort((a,b) => {
      const na = nodesById.get(a);
      const nb = nodesById.get(b);
      if (!na || !nb) return 0;
      if (na.level !== nb.level) return na.level - nb.level;
      return (na.x ?? 0) - (nb.x ?? 0);
    });

    return upgraded;
  }

  function renderUpgradedCard(){
    if (!upgradedListEl || !upgradedCountEl || !upgradedEmptyEl) return;

    const ids = getUpgradedNodeIds();


    const target = GLITCH_TARGET_NODE[currentRarity];
    const hasGlitchInTarget = appliedGlitches.has(target) && isUpgraded(target) && isEnabledByRarity(target);

    const totalCount = ids.length + (hasGlitchInTarget ? 1 : 0);
    upgradedCountEl.textContent = String(totalCount);

    upgradedListEl.replaceChildren();

    if (totalCount === 0){
      upgradedEmptyEl.style.display = 'block';
      return;
    }
    upgradedEmptyEl.style.display = 'none';


    if (currentSkill?.baseStats){
      const stats = calculateFinalStats();

      const item = document.createElement('div');
      item.className = 'upItem';

      const title = document.createElement('div');
      title.className = 'upTitle';

      const tLeft = document.createElement('div');
      tLeft.textContent = 'Final Stats';

      const badge = document.createElement('span');
      badge.className = 'upBadge';
      badge.textContent = 'Σ';

      title.appendChild(tLeft);
      title.appendChild(badge);

      const desc = document.createElement('p');
      desc.className = 'upDesc';

      const lines = [];
      const seen = new Set();
      const HIDDEN_STAT_KEYS = new Set(['previousNodeGainPercent','nextNodeGainPercent','skillLevelFlat','skillLevels']);

      const humanizeKey = (key) => {

        const s = String(key)
          .replace(/_/g, ' ')
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .trim();
        return s.charAt(0).toUpperCase() + s.slice(1);
      };

      const isPercentKey = (key) => {
        return /Percent$/.test(key) ||
               /Chance$/.test(key) ||
               /Penetration$/.test(key) ||
               /DurationPercent$/.test(key) ||
               /EffectPercent$/.test(key);
      };

      const addLine = (label, value, { allowZero=false } = {}) => {
        if (value === null || value === undefined) return;
        if (typeof value === 'number'){
          if (!Number.isFinite(value)) return;
          if (!allowZero && value === 0) return;
          lines.push(`${label}: ${value}`);
          return;
        }
        const s = String(value);
        const trimmed = s.trim();
        if (!allowZero && (trimmed === '' || trimmed === '0' || trimmed === '0%')) return;
        lines.push(`${label}: ${s}`);
      };

      const addKey = (key, labelOverride=null) => {
        if (HIDDEN_STAT_KEYS.has(key)) return;
        if (!Object.prototype.hasOwnProperty.call(stats, key)) return;
        if (seen.has(key)) return;
        seen.add(key);

        let v = stats[key];


        if (/(Min)$/.test(key)){
          const base = key.slice(0, -3);
          const maxKey = `${base}Max`;
          if (Object.prototype.hasOwnProperty.call(stats, maxKey)){
            const vMin = stats[key];
            const vMax = stats[maxKey];
            seen.add(maxKey);
            if ((vMin || 0) !== 0 || (vMax || 0) !== 0){
              addLine(labelOverride || humanizeKey(base), `${vMin} - ${vMax}`);
            }
            return;
          }
        }

        if (typeof v === 'number'){
          if (!Number.isFinite(v) || v === 0) return;

          if (key === 'aoeRadius') v = Number(v.toFixed(3));
          if (key === 'castSpeed') v = Number(v.toFixed(2));
          if (isPercentKey(key)) addLine(labelOverride || humanizeKey(key), `${v}%`);
          else addLine(labelOverride || humanizeKey(key), v);
          return;
        }


        addLine(labelOverride || humanizeKey(key), v);
      };



      {
        const total = (typeof stats.skillLevels === 'number' && Number.isFinite(stats.skillLevels))
          ? stats.skillLevels
          : 1;

        const formatted = Number.isInteger(total) ? String(total) : String(Number(total.toFixed(2)));

        addLine('Skill Levels', formatted, { allowZero: true });


        seen.add('skillLevels');
        seen.add('skillLevelFlat');
      }



      addLine('Cost', `Aether ${stats.costFlat ?? 0}`, { allowZero:true }); seen.add('costFlat');
      addLine('Cost Of Base', `Aether ${stats.costPercent ?? 0}%`, { allowZero:true }); seen.add('costPercent');
      addKey('cooldown', 'Cooldown');
      addKey('duration', 'Duration');
      addKey('damageRate', 'Damage rate');
      addKey('range', 'Range');
      addKey('damageMin', 'Aether Damage');
      addKey('aoeRadius', 'AoE radius');
      addKey('castSpeed', 'Cast speed');


      const restKeys = Object.keys(stats)
        .filter(k => !seen.has(k) && !HIDDEN_STAT_KEYS.has(k))
        .sort((a,b) => a.localeCompare(b));

      for (const k of restKeys){
        addKey(k);
      }

      desc.textContent = lines.length ? lines.join('\n') : '—';

      item.appendChild(title);
      item.appendChild(desc);
      upgradedListEl.appendChild(item);
    }


    for (const id of ids){
      const data = getNodeDisplayData(id) || { title: id, desc: "Description coming soon." };
      const n = nodesById.get(id);

      const item = document.createElement('div');
      item.className = 'upItem';

      const title = document.createElement('div');
      title.className = 'upTitle';

      const tLeft = document.createElement('div');
      tLeft.textContent = data.title || id;

      const badge = document.createElement('span');
      badge.className = 'upBadge';
      badge.textContent = (n && typeof n.level === 'number') ? ("L" + n.level) : id;

      title.appendChild(tLeft);
      title.appendChild(badge);

      const desc = document.createElement('p');
      desc.className = 'upDesc';
      desc.textContent = data.desc || "—";

      item.appendChild(title);
      item.appendChild(desc);
      upgradedListEl.appendChild(item);
    }


    if (hasGlitchInTarget){
      const g = appliedGlitches.get(target);
      const n = nodesById.get(target);

      const item = document.createElement('div');
      item.className = 'upItem';

      const title = document.createElement('div');
      title.className = 'upTitle';

      const tLeft = document.createElement('div');
      tLeft.textContent = g?.name || "Crest";

      const badge = document.createElement('span');
      badge.className = 'upBadge';
      badge.textContent = (n && typeof n.level === 'number') ? ("Crest • L" + n.level) : "Crest";

      title.appendChild(tLeft);
      title.appendChild(badge);

      const desc = document.createElement('p');
      desc.className = 'upDesc';
      desc.textContent = g?.desc || "—";

      item.appendChild(title);
      item.appendChild(desc);
      upgradedListEl.appendChild(item);
    }
  }


  function canUnlock(id){

    if (!isEnabledByRarity(id)) return false;


    if (id === 'bottom') return true;


    if (id === 'l1a' || id === 'l1b'){
      return isUpgraded('bottom');
    }


    const p = parentsById.get(id) || [];
    return p.some(parent => isUpgraded(parent));
  }

  function refreshLocks(){
    for (const n of nodes){
      const el = elById.get(n.id);
      if (!el) continue;


      const rarityLocked = !isEnabledByRarity(n.id);
      el.classList.toggle('rarityLocked', rarityLocked);
      el.dataset.rarityLocked = rarityLocked ? '1' : '0';

      if (n.id === 'bottom'){
        el.classList.remove('locked');
        el.dataset.locked = '0';
        continue;
      }


      if (n.fixed){
        el.classList.remove('locked');
        el.dataset.locked = '0';
        continue;
      }

      const unlocked = (canUnlock(n.id) || isUpgraded(n.id)) && !rarityLocked;
      el.classList.toggle('locked', !unlocked);
      el.dataset.locked = unlocked ? '0' : '1';
    }
  }

  function pruneInvalidSelections(){

    let changed = true;
    while (changed){
      changed = false;
      for (const n of nodes){
        if (n.id === 'bottom' || n.fixed) continue;
        if (!isUpgraded(n.id)) continue;

        if (!canUnlock(n.id) || !isEnabledByRarity(n.id)){
          elById.get(n.id).classList.remove('selected');
          if (selectedByLevel.get(n.level) === n.id) selectedByLevel.delete(n.level);
          changed = true;
        }
      }
    }
  }

  function createNode(n){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'node' + (n.special ? ' special' : '') + (n.fixed ? ' fixed' : '');
    btn.dataset.id = n.id;
    btn.dataset.level = String(n.level);


    if (n.id === 'bottom'){
      const inner = ensureInner(btn, 'square');
      inner.innerHTML = `<img id="bottomSkillImg" alt="" />`;
    }


    btn.addEventListener('mouseenter', (e) => {
      const g = appliedGlitches.get(n.id);

      if (g){
        showTooltipForGlitch(g);
        moveTooltip(e.clientX, e.clientY);
        return;
      }

      if (isActiveGlitchSlot(n.id)){
        hideTooltip();
        return;
      }
      showTooltipForNode(n.id);
      moveTooltip(e.clientX, e.clientY);
    });

    btn.addEventListener('mousemove', (e) => {
      if (!tooltipEl.classList.contains('show')) return;
      moveTooltip(e.clientX, e.clientY);
    });

    btn.addEventListener('mouseleave', () => {
      hideTooltip();
    });



    btn.addEventListener('dragenter', (e) => {
      e.preventDefault();
      const target = GLITCH_TARGET_NODE[currentRarity];
      if (n.id !== target) return;
      if (!isUpgraded(n.id)) return;
      btn.classList.add('dropTarget');
    });

    btn.addEventListener('dragover', (e) => {
      e.preventDefault();
      const target = GLITCH_TARGET_NODE[currentRarity];
      if (n.id !== target) return;
      if (!isUpgraded(n.id)) return;
      btn.classList.add('dropTarget');
    });

    btn.addEventListener('dragleave', () => {
      btn.classList.remove('dropTarget');
    });

    btn.addEventListener('drop', (e) => {
      e.preventDefault();
      btn.classList.remove('dropTarget');

      const target = GLITCH_TARGET_NODE[currentRarity];
      if (n.id !== target) return;


      if (!isUpgraded(n.id)) return;

      const glitchId = e.dataTransfer.getData('text/glitchId');
      if (!glitchId) return;

      const list = getGlitchesForSkill(currentSkill);
      const g = list.find(x => x.id === glitchId);
      if (!g) return;


      const inner = ensureInner(btn, 'hex');
      inner.innerHTML = '';
      const img = document.createElement('img');
      img.src = g.image;
      img.alt = g.name;
      inner.appendChild(img);


      appliedGlitches.set(n.id, g);

      renderUpgradedCard();
      saveCurrentSkillState();


});



    btn.addEventListener('click', () => {

      if (n.fixed) return;


      if (btn.dataset.rarityLocked === '1') return;


      if (btn.dataset.locked === '1') return;


      if (n.id === 'bottom') return;


      const prevId = selectedByLevel.get(n.level);
      if (prevId && prevId !== n.id){
        elById.get(prevId)?.classList.remove('selected');
      }

      btn.classList.add('selected');
      selectedByLevel.set(n.level, n.id);

      pruneInvalidSelections();
      refreshLocks();
      renderUpgradedCard();
      saveCurrentSkillState();
    });

    return btn;
  }

  function layoutNodes(){
    const { rect, cx, cy } = getTreeCenter();


    const yOffset = getYOffset();

    for (const n of nodes){
      const el = elById.get(n.id);
      const x = cx + n.x * stepX;
      const y = cy + n.y * stepY + yOffset;
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
    }
  }

  function drawLines(){
    linesEl.replaceChildren();
    const { rect, cx, cy } = getTreeCenter();


    const yOffset = getYOffset();

    function centerForNode(id){
      const n = nodesById.get(id);
      const x = cx + (n.x || 0) * stepX;
      const y = cy + (n.y || 0) * stepY + yOffset;
      return { x, y };
    }

    for (const [a,b] of edges){

      if (!isEnabledByRarity(a) || !isEnabledByRarity(b)) continue;

      const p1 = centerForNode(a);
      const p2 = centerForNode(b);

      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      line.setAttribute('class','line');
      linesEl.appendChild(line);
    }
  }

  function setRarityUI(rarity, options = {}){
    const { restoreState = true, saveState = true } = options;

    currentRarity = rarity;
    edges = getEdgesForRarity(currentRarity);
    rebuildParentsGraph();
    const label = RARITIES[rarity]?.label || rarity;
    rarityPill.textContent = label;
    rarityPill.className = 'pill rarity-' + rarity;


    pruneInvalidSelections();
    refreshLocks();
    drawLines();
    renderUpgradedCard();


    nodeTraits.clear();


    ensureLineButtons();
    layoutLineButtons();


    clearAllGlitchSlots();


    syncNodeInnersForRarity();


    buildGlitchList();
    clearNonLegendaryTop();

    if (restoreState){
      restoreCurrentSkillState();
    }

    if (saveState){
      saveCurrentSkillState();
    }
  }

  function setSkill(skillId, options = {}){
    const { restoreState = true, saveState = true } = options;

    currentSkill =
      SKILLS.find(s => s.id === skillId) ||
      SKILLS[0] ||
      { id:"", name:"—", image:"", categories:[], nodes:{} };


    skillNameEl.textContent = currentSkill.name;
    skillIdPill.textContent = "";
	skillIdPill.style.display = "none";

    if (currentSkill.image){
      skillIconImg.src = currentSkill.image;
      skillIconImg.alt = currentSkill.name || "skill";


      const bottomImg = document.getElementById('bottomSkillImg');
      if (bottomImg){
        bottomImg.src = currentSkill.image;
        bottomImg.alt = currentSkill.name || "skill";
      }
    }

    buildGlitchList();

    if (restoreState){
      restoreCurrentSkillState();
    } else {
      renderUpgradedCard();
    }

    if (saveState){
      saveCurrentSkillState();
    }
  }

  function buildSkillSelect(){
    skillSelect.replaceChildren();
    for (const s of SKILLS){
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name;
      skillSelect.appendChild(opt);
    }
  }

  function buildGlitchList(){
  if (!glitchListEl) return;
  glitchListEl.replaceChildren();

  const list = getGlitchesForSkill(currentSkill);
  for (const g of list){
    const item = document.createElement('div');
    item.className = 'glitchItem';
    item.draggable = true;
    item.title = g.name;
    item.dataset.glitchId = g.id;
	
	const gr = String(g?.rarity || '').toLowerCase();
	if (gr) item.classList.add('rarity-' + gr);

    const img = document.createElement('img');
    img.src = g.image;
    img.alt = g.name;

    item.appendChild(img);

    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/glitchId', g.id);
    });

    item.addEventListener('mouseenter', (e) => {
      tooltipTitleEl.textContent = g.name;
      tooltipDescEl.textContent  = g.desc || "Description coming soon.";
      tooltipEl.classList.add('show');
      tooltipEl.setAttribute('aria-hidden', 'false');
      moveTooltip(e.clientX, e.clientY);
    });

    item.addEventListener('mousemove', (e) => {
      if (!tooltipEl.classList.contains('show')) return;
      moveTooltip(e.clientX, e.clientY);
    });

    item.addEventListener('mouseleave', () => hideTooltip());

    glitchListEl.appendChild(item);
  }
}

  function clearNonLegendaryTop(){

  if (currentRarity === 'mythic') return;
  const topEl = elById.get('mythicTop');
  if (!topEl) return;
  removeInner(topEl);
}

  function clearGlitchTargetNode(){

    const target = GLITCH_TARGET_NODE[currentRarity];
    const el = elById.get(target);
    if (!el) return;

    if (target !== 'bottom'){
      removeInner(el);
      appliedGlitches.delete(target);
    }
  }


  
  function fitTreeToContainer(){
    const rect = treeEl.getBoundingClientRect();

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const n of nodes){
      const el = elById.get(n.id);
      if (!el) continue;
      const x = parseFloat(el.style.left || "0");
      const y = parseFloat(el.style.top || "0");
      const size = el.offsetWidth || 80;

      minX = Math.min(minX, x - size/2);
      maxX = Math.max(maxX, x + size/2);
      minY = Math.min(minY, y - size/2);
      maxY = Math.max(maxY, y + size/2);
    }

    const treeWidth = maxX - minX;
    const treeHeight = maxY - minY;

    const pad = 30;
    const scaleX = (rect.width - SIDE_GUTTER * 2 - pad) / treeWidth;
    const scaleY = (rect.height - pad) / treeHeight;
    const baseScale = Math.min(scaleX, scaleY);
    const isMobile = window.innerWidth <= 768;
    const scaleMultiplier = isMobile ? 2 : 1.4;
    const scale = baseScale * scaleMultiplier;

    const target = stageEl || treeEl;
    target.style.transformOrigin = "center center";
    target.style.transform = `scale(${scale})`;
  }


  function init(){
    buildSkillSelect();


    for (const n of nodes){
      const el = createNode(n);
      nodesEl.appendChild(el);
      elById.set(n.id, el);
    }


    elById.get('bottom').classList.add('selected');
    selectedByLevel.set(0, 'bottom');


    layoutNodes();
    drawLines();
    fitTreeToContainer();
    refreshLocks();
    renderUpgradedCard();


    ensureLineButtons();
    layoutLineButtons();


    const persistedState = readStoredState();
    const initialSkillId = (persistedState.currentSkillId && SKILLS.some(s => s.id === persistedState.currentSkillId))
      ? persistedState.currentSkillId
      : (SKILLS[0]?.id || '');

    if (initialSkillId) skillSelect.value = initialSkillId;

    setSkill(skillSelect.value, { restoreState: false, saveState: false });

    const initialSkillState = persistedState.skills?.[skillSelect.value];
    const initialRarity = RARITIES[initialSkillState?.rarity] ? initialSkillState.rarity : raritySelect.value;
    raritySelect.value = initialRarity;

    setRarityUI(raritySelect.value, { restoreState: false, saveState: false });
    restoreCurrentSkillState();
    saveCurrentSkillState();


    skillSelect.addEventListener('change', () => {
      saveCurrentSkillState();

      const rootState = readStoredState();
      const nextSkillState = rootState.skills?.[skillSelect.value];
      const nextRarity = RARITIES[nextSkillState?.rarity] ? nextSkillState.rarity : raritySelect.value;

      setSkill(skillSelect.value, { restoreState: false, saveState: false });
      raritySelect.value = nextRarity;
      setRarityUI(nextRarity, { restoreState: true, saveState: true });
    });

    raritySelect.addEventListener('change', () => setRarityUI(raritySelect.value, { restoreState: true, saveState: true }));


    new ResizeObserver(() => {
      layoutNodes();
      drawLines();
      fitTreeToContainer();
      layoutLineButtons();
    }).observe(treeEl);
  }

  init();
})();
