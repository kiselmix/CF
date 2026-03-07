// quests.page.js - SEO-friendly filtering for prerendered quest links
(function () {
  const rowsEl = document.getElementById('rows');
  const qEl = document.getElementById('q');
  const tagEl = document.getElementById('cat');
  const sortEl = document.getElementById('sort');
  const countEl = document.getElementById('count');

  if (!rowsEl || !qEl || !tagEl || !sortEl || !countEl) return;

  const rows = Array.from(rowsEl.querySelectorAll('.row')).map((row, index) => {
    const name = (row.querySelector('.name')?.textContent || '').trim();
    const desc = (row.querySelector('.desc')?.textContent || '').trim();
    const badges = Array.from(row.querySelectorAll('.badge--clickable'))
      .map(x => x.textContent.trim())
      .filter(Boolean);

    return { el: row, name, desc, badges, index };
  });

  const allTags = [...new Set(rows.flatMap(item => item.badges))]
    .sort((a, b) => a.localeCompare(b, 'en'));

  for (const tag of allTags) {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    tagEl.appendChild(opt);
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    const haystack = [item.name, item.desc, ...item.badges].join(' ').toLowerCase();
    return haystack.includes(query);
  }

  function matchesTag(item, tag) {
    if (!tag) return true;
    return item.badges.includes(tag);
  }

  function sortItems(items, mode) {
    const arr = items.slice();
    switch (mode) {
      case 'name_asc':
        arr.sort((a, b) => a.name.localeCompare(b.name, 'en'));
        break;
      case 'name_desc':
        arr.sort((a, b) => b.name.localeCompare(a.name, 'en'));
        break;
      case 'sort_asc':
      default:
        arr.sort((a, b) => a.index - b.index);
        break;
    }
    return arr;
  }

  function highlightActiveBadges(selectedTag) {
    for (const badge of rowsEl.querySelectorAll('.badge--clickable')) {
      const isActive = selectedTag && badge.getAttribute('data-tag') === selectedTag;
      badge.classList.toggle('badge--active', !!isActive);
    }
  }

  function render() {
    const query = qEl.value.trim().toLowerCase();
    const tag = tagEl.value;
    const mode = sortEl.value;

    let filtered = rows.filter(item => matchesTag(item, tag) && matchesQuery(item, query));
    filtered = sortItems(filtered, mode);

    rowsEl.innerHTML = '';

    if (!filtered.length) {
      rowsEl.innerHTML = '<div class="emptyState">Nothing found. Try changing search or tag filter.</div>';
    } else {
      const fragment = document.createDocumentFragment();
      for (const item of filtered) fragment.appendChild(item.el);
      rowsEl.appendChild(fragment);
    }

    highlightActiveBadges(tag);
    countEl.textContent = `${filtered.length} / ${rows.length}`;
  }

  rowsEl.addEventListener('click', (e) => {
    const badge = e.target.closest('.badge--clickable');
    if (!badge) return;
    e.preventDefault();
    e.stopPropagation();
    const tag = badge.getAttribute('data-tag');
    tagEl.value = tagEl.value === tag ? '' : tag;
    render();
  });

  qEl.addEventListener('input', render);
  tagEl.addEventListener('change', render);
  sortEl.addEventListener('change', render);

  render();
})();
