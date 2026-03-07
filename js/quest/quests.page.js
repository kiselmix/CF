// quests.page.js
(function () {
  const skill = Array.isArray(window.quest) ? window.quest.slice() : [];

  const rowsEl = document.getElementById("rows");
  const qEl = document.getElementById("q");
  const tagEl = document.getElementById("cat");
  const sortEl = document.getElementById("sort");
  const countEl = document.getElementById("count");

  const slugify = (value) => String(value || '').trim().toLowerCase();
  const getQuestUrl = (item) => `quests/${encodeURIComponent(slugify(item.id))}`;

  const allTags = [];
  for (const t of skill) {
    if (t.type && String(t.type) !== "Skill") allTags.push(t.type);
    if (Array.isArray(t.tags)) allTags.push(...t.tags);
  }
  const tags = [...new Set(allTags.filter(Boolean))].sort((a, b) =>
    String(a).localeCompare(String(b), "en")
  );

  for (const tg of tags) {
    const opt = document.createElement("option");
    opt.value = tg;
    opt.textContent = tg;
    tagEl.appendChild(opt);
  }

  function escapeHTML(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
  function escapeAttr(s) {
    return String(s ?? "").replace(/"/g, "&quot;");
  }

  function rowHTML(t) {
    const badges = []
      .concat(
        t.type && String(t.type) !== "Skill"
          ? [
              `<span class="badge badge--clickable" data-tag="${escapeAttr(t.type)}">${escapeHTML(t.type)}</span>`,
            ]
          : []
      )
      .concat(
        (t.tags || []).map(
          (x) => `<span class="badge badge--clickable" data-tag="${escapeAttr(x)}">${escapeHTML(x)}</span>`
        )
      )
      .join("");

    const url = getQuestUrl(t);

    return `
    <div class="row" data-id="${escapeAttr(t.id)}" data-url="${escapeAttr(url)}">
      <div class="cell">
          <div class="meta">
            <div class="titleline">
              <a class="name" href="${escapeAttr(url)}">${escapeHTML(t.name)}</a>
              <span class="badges">${badges}</span>
            </div>
            <div class="desc">${escapeHTML(t.description || "")}</div>
          </div>
        </div>
      </div>
    `;
  }

  function matchQuery(t, q) {
    if (!q) return true;
    const hay = [t.id, t.name, t.type, ...(t.tags || []), t.description, t.note]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function hasTag(t, selectedTag) {
    if (!selectedTag) return true;
    if (t.type && String(t.type) !== "Skill" && String(t.type) === String(selectedTag)) return true;
    const list = Array.isArray(t.tags) ? t.tags : [];
    return list.some((x) => String(x) === String(selectedTag));
  }

  function sortskill(list, mode) {
    const arr = list.slice();
    switch (mode) {
      case "name_asc":
        arr.sort((a, b) => (a.name || "").localeCompare(b.name || "", "en"));
        break;
      case "name_desc":
        arr.sort((a, b) => (b.name || "").localeCompare(a.name || "", "en"));
        break;
      case "sort_asc":
      default:
        arr.sort((a, b) => (a.sort ?? 999999) - (b.sort ?? 999999));
        break;
    }
    return arr;
  }

  function highlightActiveBadges(selectedTag) {
    if (selectedTag) {
      for (const b of rowsEl.querySelectorAll(".badge--clickable")) {
        const isActive = b.getAttribute("data-tag") === selectedTag;
        b.classList.toggle("badge--active", isActive);
      }
    } else {
      for (const b of rowsEl.querySelectorAll(".badge--clickable")) {
        b.classList.remove("badge--active");
      }
    }
  }

  function render() {
    const q = (qEl.value || "").trim().toLowerCase();
    const selectedTag = tagEl.value;
    const mode = sortEl.value;

    let filtered = skill.filter((t) => hasTag(t, selectedTag) && matchQuery(t, q));
    filtered = sortskill(filtered, mode);

    if (!filtered.length) {
      rowsEl.innerHTML = `<div class="emptyState">Nothing found. Try changing search or tag filter.</div>`;
    } else {
      rowsEl.innerHTML = filtered.map(rowHTML).join("");
    }
    highlightActiveBadges(selectedTag);

    countEl.textContent = `${filtered.length} / ${skill.length}`;

    for (const el of rowsEl.querySelectorAll(".row")) {
      el.tabIndex = 0;
      el.setAttribute("role", "link");
      el.setAttribute(
        "aria-label",
        `Open quest: ${el.querySelector(".name")?.textContent || ""}`
      );
    }
  }

  rowsEl.addEventListener("click", (e) => {
    const badge = e.target.closest?.(".badge--clickable");
    if (badge) {
      e.preventDefault();
      e.stopPropagation();
      const tag = badge.getAttribute("data-tag");
      if (tag) {
        tagEl.value = (tagEl.value === tag) ? "" : tag;
        render();
      }
      return;
    }

    const directLink = e.target.closest?.('a');
    if (directLink) return;

    const row = e.target.closest?.(".row");
    if (!row) return;
    const url = row.getAttribute("data-url");
    if (!url) return;
    window.location.href = url;
  });

  rowsEl.addEventListener("keydown", (e) => {
    const row = e.target.closest?.(".row");
    if (!row) return;
    if (e.key !== "Enter" && e.key !== " ") return;

    const badge = e.target.closest?.(".badge--clickable");
    if (badge) {
      e.preventDefault();
      const tag = badge.getAttribute("data-tag");
      if (tag) {
        tagEl.value = (tagEl.value === tag) ? "" : tag;
        render();
      }
      return;
    }

    e.preventDefault();
    const url = row.getAttribute("data-url");
    if (!url) return;
    window.location.href = url;
  });

  qEl.addEventListener("input", render);
  tagEl.addEventListener("change", render);
  sortEl.addEventListener("change", render);

  render();
})();
