const MARKER_TYPES = {
  well: {
    label: 'Well',
    icon: '../maps/icon/well.png',
    clickable: false
  },
  dungeon: {
    label: 'Dungeon',
    icon: '../maps/icon/dungeon.png',
    clickable: true
  },
  shrine: {
    label: 'Shrine',
    icon: '../maps/icon/shrine.png',
    clickable: false
  },
  boss: {
    label: 'boss',
    icon: '../maps/icon/boss.png',
    clickable: false
  },
  portal: {
    label: 'Portal',
    icon: '../maps/icon/portal.png',
    clickable: false
  },
  merchant: {
    label: 'merchant',
    icon: '../maps/icon/merchant.png',
    clickable: false
  },
  stash: {
    label: 'stash',
    icon: '../maps/icon/stash.png',
    clickable: false
  },
  terminal: {
    label: 'terminal',
    icon: '../maps/icon/terminal.png',
    clickable: false
  },
};


const GAME_MAPS = {
arcadia: {
    title: 'Arcadia',
    svg: '../maps/act-2/Arcadia.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 723, x: 260, title: 'Outer Vault', targetMap: 'outervault', showLabel: true},
		{ type: 'well',  y: 524, x: 564, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'portal',  y: 548, x: 442, title: 'Portal', desc: 'Fast travel' },
		{ type: 'stash',  y: 532, x: 553, title: 'Stash', desc: 'Storage', showLabel: true },
		{ type: 'stash',  y: 721, x: 162, title: 'Stash', desc: 'Storage', showLabel: true },
		{ type: 'merchant',  y: 602, x: 564, title: 'Merchant', desc: 'Repair/disassembly of items', showLabel: true },
		{ type: 'terminal',  y: 268, x: 470, title: 'Terminal', desc: 'Moving around the world', showLabel: true },
    ],
  },
  
    outervault: {
    title: "Outer Vault",
    svg: "../maps/act-2/Outer Vault.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 103, x: 418, title: 'Arcadia', targetMap: 'arcadia', showLabel: true },
      { type: 'dungeon', y: 915, x: 446, title: 'Inner Vault', targetMap: 'innervault', showLabel: true },
	  { type: 'well',  y: 128, x: 388, title: 'Well', desc: 'Refilling flasks', showLabel: true}, 
	  { type: 'shrine',   y: 530, x: 473, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
  
    innervault: {
    title: 'Inner Vault',
    svg: '../maps/act-2/Inner Vault.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'well',  y: 125, x: 344, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 768, x: 484, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'dungeon', y: 113, x: 368, title: 'Outer Vault', targetMap: 'outervault', showLabel: true },
		{ type: 'dungeon', y: 918, x: 319, title: 'Arcadia', targetMap: 'arcadia', showLabel: true },
		{ type: 'boss',  y: 833, x: 402, title: 'Boss', desc: 'Boss', showLabel: true},
		{ type: 'shrine',   y: 267, x: 483, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 84, x: 343, title: 'Portal', desc: 'Fast travel' },
    ],
  },

};

function createMarkerSystem({ map, points, onPortalClick, sidebarRoot }) {
  // Layer groups
  const layers = {};
  for (const typeKey of Object.keys(MARKER_TYPES)) {
    layers[typeKey] = L.layerGroup().addTo(map);
  }

  // Sidebar checkboxes (reset + render)
  if (sidebarRoot) {
    sidebarRoot.innerHTML = '';
    const HIDDEN_TYPES = ['boss', 'merchant', 'stash'];

	for (const [typeKey, meta] of Object.entries(MARKER_TYPES)) {
	  if (HIDDEN_TYPES.includes(typeKey)) continue;
      const row = document.createElement('div');
      row.className = 'row';

      const left = document.createElement('div');
      left.className = 'left';

      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.background = meta.color;

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = meta.label;

      left.appendChild(dot);
      left.appendChild(label);

      const sw = document.createElement('label');
      sw.className = 'switch';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = true;

      const slider = document.createElement('span');
      slider.className = 'slider';

      sw.appendChild(input);
      sw.appendChild(slider);

      input.addEventListener('change', () => {
        if (input.checked) {
          layers[typeKey].addTo(map);
        } else {
          map.removeLayer(layers[typeKey]);
        }
      });

      row.appendChild(left);
      row.appendChild(sw);
      sidebarRoot.appendChild(row);
    }
  }

  // Markers
  for (const p of points) {
    if (!layers[p.type]) continue;

    const meta = MARKER_TYPES[p.type];
	
	const icon = makeImageIcon(
	  meta.icon,
	  meta.clickable,
	  p.showLabel ? p.title : null
	);
	
	
    const marker = L.marker([p.y, p.x], { icon, title: p.title });

    const popupHtml = `
      <div class="popup-title">${escapeHtml(p.title)}</div>
      ${p.desc ? `<div class="popup-desc">${escapeHtml(p.desc)}</div>` : ''}
      ${p.type === 'dungeon' && p.targetMap ? `<div style="margin-top:8px; font-size:12px; opacity:.75;">Clicking on the marker will switch the map</div>` : ''}
    `;
    marker.bindPopup(popupHtml);


    if (p.type === 'dungeon' && p.targetMap && typeof onPortalClick === 'function') {
      marker.on('click', () => onPortalClick(p.targetMap));
    }

    marker.addTo(layers[p.type]);
  }

function makeImageIcon(src, clickable, labelText) {
  const size = clickable ? 48 : 40;

  const html = `
    <div style="
      display:flex;
      flex-direction:column;
      align-items:center;
      pointer-events:auto;
    ">
      <img src="${src}"
           style="
             width:${size}px;
             height:${size}px;
             object-fit:contain;
           "
      />
      ${labelText ? `
        <div style="
          margin-top:4px;
          font-size:12px;
          color:#fff;
          text-shadow:0 1px 4px rgba(0,0,0,0.8);
          white-space:nowrap;
        ">
          ${escapeHtml(labelText)}
        </div>
      ` : ''}
    </div>
  `;

  return L.divIcon({
    className: clickable ? 'marker-clickable' : 'marker-static',
    html,
    iconSize: [size, size + 18],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}


  function destroy() {
    // remove layer groups from map
    for (const layer of Object.values(layers)) {
      map.removeLayer(layer);
    }
  }

  return { layers, destroy };
}

function makeDotIcon(color, clickable) {
  // Self-contained icon without images
  const border = clickable ? '2px solid rgba(255,255,255,0.95)' : '1px solid rgba(255,255,255,0.55)';
  const glow = clickable ? '0 0 0 4px rgba(255,255,255,0.12), 0 0 18px rgba(239,71,111,0.25)' : '0 0 0 3px rgba(255,255,255,0.08)';
  const size = clickable ? 18 : 14;

  const html = `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      background:${color};
      border:${border};
      box-shadow:${glow};
      transform: translate3d(0,0,0);
    "></div>
  `;

  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2],
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
