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
};


const GAME_MAPS = {
	  dumping: {
    title: 'Dumping Grounds',
    svg: '../maps/act-1/Dumping-Grounds.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 613, x: 475, title: 'The Cache', targetMap: 'cache', showLabel: true},
		{ type: 'dungeon', y: 961, x: 632, title: "Castaway's Landing", targetMap: 'castaway', showLabel: true },
		{ type: 'shrine',   y: 342, x: 494, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'well',  y: 548, x: 356, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 577, x: 606, title: 'Well', desc: 'Refilling flasks', showLabel: true},
    ],
  },
  
    cache: {
    title: 'The Cache',
    svg: '../maps/act-1/The-Cache.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 748, x: 215, title: 'Dumping Grounds', targetMap: 'dumping', showLabel: true },
    ],
  },

  castaway: {
    title: "Castaway's Landing",
    svg: "../maps/act-1/Castaway's-Landing.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'Dumping Grounds', targetMap: 'dumping', showLabel: true },
      { type: 'dungeon', y: 790, x: 475, title: 'Blackwater Creek', targetMap: 'blackwater', showLabel: true },
	  { type: 'portal',  y: 216, x: 530, title: 'Portal', desc: 'Fast travel' },
	  { type: 'well',  y: 403, x: 567, title: 'Well', desc: 'Refilling flasks', showLabel: true},
	  { type: 'stash',  y: 239, x: 633, title: 'Stash', desc: 'Storage', showLabel: true },
	  { type: 'merchant',  y: 407, x: 460, title: 'Merchant', desc: 'Repair/disassembly of items', showLabel: true },
    ],
  },
  
	
  blackwater: {
    title: 'Blackwater Creek',
    svg: '../maps/act-1/Blackwater-Creek.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine',   y: 124, x: 580, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'well',  y: 386, x: 632, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 731, x: 539, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'dungeon', y: 425, x: 274, title: "В Castaway's Landing", targetMap: 'castaway', showLabel: true },
		{ type: 'dungeon', y: 872, x: 590, title: 'Putrid Lake', targetMap: 'putridlake', showLabel: true },
    ],
  },
  
  
  putridlake: {
    title: 'Putrid Lake',
    svg: '../maps/act-1/Putrid-Lake.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'portal',  y: 763, x: 674, title: 'Portal', desc: 'Fast travel' },
		{ type: 'dungeon', y: 411, x: 250, title: 'Echoing Grotto', targetMap: 'echoing', showLabel: true },
		{ type: 'dungeon', y: 213, x: 203, title: 'Blackwater Creek', targetMap: 'blackwater', showLabel: true },
		{ type: 'dungeon', y: 870, x: 663, title: 'Rat Burrow', targetMap: 'ratburrow', showLabel: true },
    ],
  },
  
  echoing: {
    title: 'Echoing Grotto',
    svg: '../maps/act-1/Echoing-Grotto.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine',   y: 883, x: 391, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'dungeon', y: 914, x: 322, title: 'Putrid Lake', targetMap: 'putridlake', showLabel: true },
		{ type: 'dungeon', y: 490, x: 773, title: 'Wormhole', targetMap: 'wormhole', showLabel: true },
		{ type: 'dungeon', y: 371, x: 855, title: 'The Cliffs', targetMap: 'cliffs', showLabel: true },
    ],
  },
  
    wormhole: {
    title: 'Wormhole',
    svg: '../maps/act-1/Wormhole.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine', y: 398, x: 209, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'dungeon', y: 882, x: 589, title: 'Echoing Grotto', targetMap: 'echoing', showLabel: true },
		{ type: 'well',  y: 130, x: 477, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 480, x: 784, title: 'Well', desc: 'Refilling flasks', showLabel: true},
    ],
  },
  
    cliffs: {
    title: 'The Cliffs',
    svg: '../maps/act-1/The-Cliffs.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'well',  y: 452, x: 564, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'portal',  y: 88, x: 733, title: 'Portal', desc: 'Fast travel' },
		{ type: 'dungeon', y: 118, x: 713, title: 'Echoing Grotto', targetMap: 'echoing', showLabel: true },
		{ type: 'dungeon', y: 532, x: 585, title: 'Rock Shelter', targetMap: 'rockshelter', showLabel: true }, 
		{ type: 'dungeon', y: 936, x: 427, title: 'Cliff Temple', targetMap: 'clifftemple', showLabel: true }, 
		{ type: 'dungeon', y: 933, x: 702, title: 'The Veiled Passage', targetMap: 'veiled', showLabel: true },
    ],
  },
  
      veiled: {
    title: 'The Veiled Passage',
    svg: '../maps/act-1/The-Veiled-Passage.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine', y: 134, x: 322, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'dungeon', y: 150, x: 267, title: 'The Cliffs', targetMap: 'cliffs', showLabel: true },
		{ type: 'dungeon', y: 933, x: 242, title: "Weaver's Nest", targetMap: 'weavernest', showLabel: true },
		{ type: 'dungeon', y: 836, x: 342, title: 'Rugged Plains', targetMap: 'ruggedplains', showLabel: true },
    ],
  },
  
  weavernest: {
    title: "Weaver's Nest",
    svg: '../maps/act-1/Weavers-Nest.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'well',  y: 438, x: 815, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 480, x: 206, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'dungeon', y: 221, x: 491, title: 'The Veiled Passage', targetMap: 'veiled', showLabel: true },
    ],
  },
  
  ruggedplains: {
    title: 'Rugged Plains',
    svg: '../maps/act-1/Rugged-Plains.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'well',  y: 225, x: 517, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 429, x: 708, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 462, x: 433, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 689, x: 257, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 706, x: 503, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 198, x: 687, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 479, x: 467, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 742, x: 297, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 785, x: 545, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 88, x: 733, title: 'Portal', desc: 'Fast travel' },
		{ type: 'dungeon', y: 67, x: 778, title: 'The Veiled Passage', targetMap: 'veiled', showLabel: true },
		{ type: 'dungeon', y: 956, x: 430, title: "Hole In The Wall", targetMap: 'holewall', showLabel: true },
		{ type: 'dungeon', y: 346, x: 650, title: 'The Dry Well', targetMap: 'thedrywell',showLabel: true },
    ],
  },
  
    holewall: {
    title: 'Hole In The Wall',
    svg: '../maps/act-1/Hole-In-The-Wall.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 215, x: 232, title: 'Rugged Plains', targetMap: 'ruggedplains', showLabel: true },
		{ type: 'dungeon', y: 712, x: 436, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
    ],
  },
  
    outercourt: {
    title: 'Outer Court',
    svg: '../maps/act-1/Outer-Court.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine',   y: 173, x: 437, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 332, x: 554, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 536, x: 317, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 673, x: 660, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 884, x: 425, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'well',  y: 129, x: 425, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 282, x: 528, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 404, x: 545, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 627, x: 333, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 701, x: 228, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 718, x: 610, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 863, x: 480, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'portal',  y: 597, x: 473, title: 'Portal', desc: 'Fast travel' },
		{ type: 'dungeon', y: 85, x: 607, title: 'Hole In The Wall', targetMap: 'holewall', showLabel: true },
		{ type: 'dungeon', y: 407, x: 654, title: 'Abandonded Cellblock', targetMap: 'abandondedcellblock', showLabel: true },
		{ type: 'dungeon', y: 753, x: 244, title: 'Armory', targetMap: 'armory', showLabel: true },
		{ type: 'dungeon', y: 943, x: 759, title: 'The Prison Intake', targetMap: 'prisonintake', showLabel: true },
    ],
  },
  
  prisonintake: {
    title: 'The Prison Intake',
    svg: '../maps/act-1/The-Prison-Intake.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine', y: 518, x: 721, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'well',  y: 891, x: 239, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'dungeon', y: 105, x: 522, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
		{ type: 'dungeon', y: 925, x: 192, title: 'Experimentation Ward', targetMap: 'experimentation', showLabel: true },
    ],
  },
  
    experimentation: {
    title: 'Experimentation Ward',
    svg: '../maps/act-1/Experimentation-Ward.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'shrine',   y: 426, x: 682, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 367, x: 156, title: 'Portal', desc: 'Fast travel' },
		{ type: 'dungeon', y: 328, x: 75, title: 'The Prison Intake', targetMap: 'prisonintake', showLabel: true },
		{ type: 'dungeon', y: 594, x: 848, title: 'Torture Chamber', targetMap: 'torturechamber', showLabel: true },
    ],
  },
  
    torturechamber: {
    title: 'Torture Chamber',
    svg: '../maps/act-1/Torture-Chamber.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'well',  y: 590, x: 130, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'dungeon', y: 233, x: 931, title: 'Experimentation Ward', targetMap: 'experimentation', showLabel: true },
		{ type: 'dungeon', y: 670, x: 58, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
		{ type: 'boss',  y: 624, x: 103, title: 'Boss', desc: 'Boss', showLabel: true},
    ],
  },
  
  ratburrow: {
    title: "Rat Burrow",
    svg: "../maps/act-1/Rat-Burrow.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'Putrid Lake', targetMap: 'putridlake', showLabel: true },
    ],
  },
  
  rockshelter: {
    title: "Rock Shelter",
    svg: "../maps/act-1/Rock-Shelter.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'The Cliffs', targetMap: 'cliffs', showLabel: true },
    ],
  },
  
  clifftemple: {
    title: "Cliff Temple",
    svg: "../maps/act-1/Cliff-Temple.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'The Cliffs', targetMap: 'cliffs', showLabel: true },
    ],
  },
  
  thedrywell: {
    title: "The Dry Well",
    svg: "../maps/act-1/The-Dry-Well.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'Rugged Plains', targetMap: 'ruggedplains', showLabel: true },
    ],
  },
  
   armory: {
    title: "Armory",
    svg: "../maps/act-1/Armory.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
    ],
  },
  
   abandondedcellblock: {
    title: "Abandonded Cellblock",
    svg: "../maps/act-1/Abandonded-Cellblock.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 289, x: 175, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
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
