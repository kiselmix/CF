(function () {

  const quests = window.CRYSTALFALL_QUESTS || [];
  if (!quests.length) return;

  const path = window.location.pathname;
  const slug = path.split("/").pop().replace(".html","");

  const index = quests.findIndex(q => q.slug === slug);
  if (index === -1) return;

  const prev = quests[index - 1];
  const next = quests[index + 1];

  const root = document.getElementById("questNavBlock");
  if (!root) return;

  let html = '<div class="moreQuests">';

  if (prev || next) {
    html += `<div class="moreQuestsTitle">Quest navigation</div>`;
    html += `<div class="moreQuestsGrid">`;

    if (prev) {
      html += `
      <a class="moreQuestCard" href="./${prev.slug}.html">
        <span class="mqName">← ${prev.title}</span>
        <span class="mqType">Previous quest</span>
      </a>`;
    }

    if (next) {
      html += `
      <a class="moreQuestCard" href="./${next.slug}.html">
        <span class="mqName">${next.title} →</span>
        <span class="mqType">Next quest</span>
      </a>`;
    }

    html += `</div>`;
  }

  const more = quests
    .filter((_,i)=> i!==index)
    .slice(0,3);

  html += `<div class="moreQuestsTitle">More Crystalfall quests</div>`;
  html += `<div class="moreQuestsGrid">`;

  more.forEach(q=>{
    html += `
      <a class="moreQuestCard" href="./${q.slug}.html">
        <span class="mqName">${q.title}</span>
        <span class="mqType">Quest guide</span>
      </a>
    `;
  });

  html += `</div>`;

  html += `
    <div style="margin-top:12px">
      <a class="moreQuestCard" href="../quests.html">
        <span class="mqName">All quests</span>
        <span class="mqType">View full list</span>
      </a>
    </div>
  `;

  html += `</div>`;

  root.innerHTML = html;

})();