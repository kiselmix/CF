// skill.detail.js
(function () {
  const list = Array.isArray(window.skill) ? window.skill : [];
  const root = document.getElementById('skillRoot');
  const copyBtn = document.getElementById('copy');

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHTML(s){
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }
  function escapeAttr(s){ return String(s ?? '').replace(/"/g, "&quot;"); }

  function iconHTML(t){
    if (t.icon) {
      return `<div class="iconBig"><img src="${escapeAttr(t.icon)}" alt="${escapeAttr(t.name)}"></div>`;
    }
    const letter = (t.name || "?").trim().charAt(0).toUpperCase();
    return `<div class="iconBig"><div class="fallback" style="height:100%; font-size:36px">${escapeHTML(letter)}</div></div>`;
  }

  function tagHTML(text){
    return `<span class="tag">${escapeHTML(text)}</span>`;
  }

  function statsHTML(t){
    const s = t.stats || {};
    const rows = [];

    const labels = {
      skillLevel: 'Skill Level',
      cost: 'Cost',
      requirements: 'Requirements',
      cooldown: 'Cooldown',
      range: 'Range',
      damageRate: 'Damage rate',
      fireDamage: 'Fire Damage',
      aetherDamage: 'Aether Damage',
      physicalDamage: 'Physical Damage',
      projectileSpeed: 'Projectile Speed',
      castSpeed: 'Cast Speed',
      duration: 'Duration',
      charges: 'Charges',
      aoeRadius: 'AoE Radius'
    };

    const preferredOrder = [
      'skillLevel',
      'cost',
      'fireDamage',
      'aetherDamage',
      'physicalDamage',
      'projectileSpeed',
      'castSpeed',
      'cooldown',
      'charges',
      'aoeRadius',
      'duration',
      'damageRate',
      'range',
      'requirements'
    ];

    function humanizeKey(key){
      const s1 = String(key)
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .trim();
      return s1 ? (s1.charAt(0).toUpperCase() + s1.slice(1)) : key;
    }

    const added = new Set();

    function addRow(key){
      const val = s[key];
      if (val == null) return;
      const label = labels[key] || humanizeKey(key);
      rows.push(`<li><b>${escapeHTML(label)}:</b> ${escapeHTML(val)}</li>`);
      added.add(key);
    }


    for (const key of preferredOrder) addRow(key);


    for (const key of Object.keys(s)) {
      if (added.has(key)) continue;
      addRow(key);
    }

    if (!rows.length) return '';
    return `<ul class="stats">${rows.join('')}</ul>`;
  }

  function effectsHTML(t){
    const eff = Array.isArray(t.effects) ? t.effects : [];
    if (!eff.length) return '';
    return `<ul class="effects">${eff.map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>`;
  }

  function videoHTML(t){
    const v = t.video;
    if (!v) {
      return `<div class="empty">The video has not been added yet.</div>`;
    }

    // youtube
    if (v.type === 'youtube' && v.id) {
      const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?rel=0`;
      return `
        <div class="responsive">
          <iframe
            src="${src}"
            title="${escapeAttr(t.name)}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      `;
    }


    if ((v.type === 'mp4' || v.type === 'webm') && v.src) {
      return `
        <div class="responsive">
          <video controls autoplay muted playsinline loop>
            <source src="${escapeAttr(v.src)}" type="video/${escapeAttr(v.type)}" />
          </video>
        </div>
      `;
    }

    // fallback: просто ссылка
    if (v.src) {
      return `<div class="empty">Video: <a href="${escapeAttr(v.src)}" target="_blank" rel="noreferrer">open</a></div>`;
    }
    return `<div class="empty">The video has not been added yet.</div>`;
  }

  function render(t){
    if (!t) {
      root.innerHTML = `
        <div class="cardFrame">
          <div class="empty">Skill not found. Check the link or return to the list.</div>
        </div>
      `;
      return;
    }

    document.title = `${t.name} — Skills`;

    const tags = []
      .concat(t.type && String(t.type) !== "Skill" ? [t.type] : [])
      .concat(t.tags || [])
      ;


    const tagsHTML = tags.length
      ? `<div class="tagsLine">${tags.map(tagHTML).join('')}</div>`
      : '';

    root.innerHTML = `
      <article class="cardFrame">
        <div class="cardInner">
          <div class="topTitle">
            <div>
              <h1 class="skillName">${escapeHTML(t.name)}</h1>
              <div class="skillKind">Skill</div>
              ${tagsHTML}
            </div>
          </div>

          <div class="grid">
            <div>
              ${t.flavor ? `<div class="flavor">${escapeHTML(t.flavor)}</div>` : ''}
              ${t.description ? `<div class="desc" style="margin-top:10px; font-size:15px; color:#e8e0d4">${escapeHTML(t.description)}</div>` : ''}
              ${statsHTML(t)}
              ${effectsHTML(t)}
            </div>
            <div style="display:flex; justify-content:flex-end">${iconHTML(t)}</div>
          </div>

          ${t.note ? `<div class="hr"></div><div class="small">${escapeHTML(t.note)}</div>` : ''}
        </div>

        <div class="videoWrap">
          <div class="videoTitle">Video</div>
          ${videoHTML(t)}
        </div>
      </article>
    `;
  }

  // copy link
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyBtn.textContent = 'Скопировано';
        setTimeout(() => (copyBtn.textContent = 'Ссылка'), 900);
      } catch {
        // no-op
      }
    });
  }

  const id = qs('id');
  const t = list.find(x => String(x.id) === String(id));
  render(t);
})();
