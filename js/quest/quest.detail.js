// quest.detail.js
(function () {
  const list = Array.isArray(window.quest) ? window.quest : [];
  const root = document.getElementById('questRoot');
  const copyBtn = document.getElementById('copy');

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHTML(s){
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }
  function escapeAttr(s){ return String(s ?? '').replace(/"/g, '&quot;'); }

  function tagHTML(text){
    return `<span class="tag">${escapeHTML(text)}</span>`;
  }

  function stepsHTML(t){
    const steps = Array.isArray(t.steps) ? t.steps : [];
    if (!steps.length) return `<div class="empty">Steps are not added yet.</div>`;

    const blocks = steps.map((s, idx) => {
      const images = Array.isArray(s.images) ? s.images : [];
      const imgsHTML = images.map(src => `
        <div class="responsive" style="margin-top:10px">
          <img src="${escapeAttr(src)}" alt="${escapeAttr(s.title || 'Step')}" style="width:100%; height:100%; object-fit:cover; display:block;">
        </div>
      `).join('');

      return `
        <div style="margin:0 0 14px">
          <div style="color:#4bd6ff; font-weight:700; font-size:18px; margin:0 0 6px">${idx+1}. ${escapeHTML(s.title || `Step ${idx+1}`)}</div>
          ${s.text ? `<div class="desc" style="margin-top:0; font-size:15px; color:#e8e0d4">${escapeHTML(s.text)}</div>` : ''}
          ${imgsHTML}
        </div>
      `;
    }).join('');

    return blocks;
  }

  function render(t){
    if (!t) {
      root.innerHTML = `
        <div class="cardFrame">
          <div class="empty">Quest not found. Check the link or return to the list.</div>
        </div>
      `;
      return;
    }

    document.title = `${t.name} — Quests`;

    const tags = [].concat(t.tags || []);

    const tagsHTML = tags.length
      ? `<div class="tagsLine">${tags.map(tagHTML).join('')}</div>`
      : '';

    root.innerHTML = `
      <article class="cardFrame">
        <div class="cardInner">
          <div class="topTitle">
            <div>
              <h1 class="skillName">${escapeHTML(t.name)}</h1>
              <div class="skillKind">Quest</div>
              ${tagsHTML}
            </div>
          </div>

          <div class="grid">
            <div>
              ${t.flavor ? `<div class="flavor">${t.flavor}</div>` : ''}
              ${t.description ? `<div class="desc" style="margin-top:10px; font-size:15px; color:#e8e0d4">${escapeHTML(t.description)}</div>` : ''}
            </div>
          </div>
        </div>

        <div class="videoWrap">
          <div class="videoTitle">How to complete</div>
          ${stepsHTML(t)}
        </div>
      </article>
    `;
  }

  // copy link (если кнопка есть в header)
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyBtn.textContent = 'Copied';
        setTimeout(() => (copyBtn.textContent = 'Link'), 900);
      } catch {
        // no-op
      }
    });
  }

  const id = qs('id');
  const t = list.find(x => String(x.id) === String(id));
  render(t);
})();
