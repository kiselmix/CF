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
		{ type: 'dungeon', y: 936, x: 427, title: 'Cliff Temple', targetMap: 'theclifftemple', showLabel: true }, 
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
      { type: 'dungeon', y: 813, x: 773, title: 'Putrid Lake', targetMap: 'putridlake', showLabel: true },
    ],
  },
  
  rockshelter: {
    title: "Rock Shelter",
    svg: "../maps/act-1/Rock-Shelter.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 689, x: 111, title: 'The Cliffs', targetMap: 'cliffs', showLabel: true },
    ],
  },
  
  theclifftemple: {
    title: "Cliff Temple",
    svg: "../maps/act-1/Cliff-Temple.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 227, x: 175, title: 'The Cliffs', targetMap: 'cliffs', showLabel: true },
    ],
  },
  
  thedrywell: {
    title: "The Dry Well",
    svg: "../maps/act-1/The-Dry-Well.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 815, x: 769, title: 'Rugged Plains', targetMap: 'ruggedplains', showLabel: true },
    ],
  },
  
   armory: {
    title: "Armory",
    svg: "../maps/act-1/Armory.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 869, x: 565, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
    ],
  },
  
   abandondedcellblock: {
    title: "Abandonded Cellblock",
    svg: "../maps/act-1/Abandonded-Cellblock.svg",
    bounds: [[0, 0], [1000, 1000]],
    points: [
      { type: 'dungeon', y: 725, x: 861, title: 'Outer Court', targetMap: 'outercourt', showLabel: true },
    ],
  },
  
  /*ACT-2*/
  
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
  
    /*ACT-3*/
	
	
	miningcamp: {
    title: 'Mining Camp',
    svg: '../maps/act-3/Mining Camp.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 656, x: 153, title: 'Badlands', targetMap: 'badlands', showLabel: true},
		{ type: 'well',  y: 513, x: 347, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'portal',  y: 546, x: 171, title: 'Portal', desc: 'Fast travel' },
		{ type: 'stash',  y: 556, x: 340, title: 'Stash', desc: 'Storage', showLabel: true },
		{ type: 'merchant',  y: 550, x: 368, title: 'Merchant', desc: 'Repair/disassembly of items', showLabel: true },
		{ type: 'terminal',  y: 508, x: 829, title: 'Terminal', desc: 'Moving around the world', showLabel: true },
    ],
  },
  
  	badlands: {
    title: 'Badlands',
    svg: '../maps/act-3/Badlands.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 722, x: 815, title: 'Mining Camp', targetMap: 'miningcamp', showLabel: true},
		{ type: 'dungeon', y: 433, x: 687, title: 'Bore Hole', targetMap: 'borehole', showLabel: true},
		{ type: 'dungeon', y: 356, x: 251, title: 'Abandoned Mine', targetMap: 'abandonedmine', showLabel: true},
		{ type: 'dungeon', y: 913, x: 435, title: 'Crystal Charm', targetMap: 'crystalcharm', showLabel: true},
		{ type: 'well',  y: 219, x: 737, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 493, x: 443, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 830, x: 530, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 628, x: 274, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 178, x: 715, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 381, x: 463, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 629, x: 259, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
    borehole: {
    title: 'Bore Hole',
    svg: '../maps/act-3/Bore Hole.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 809, x: 763, title: 'Badlands', targetMap: 'badlands', showLabel: true},
    ],
  },
  
    abandonedmine: {
    title: 'Abandoned Mine',
    svg: '../maps/act-3/Abandoned Mine.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 703, x: 819, title: 'Badlands', targetMap: 'badlands', showLabel: true},
    ],
  },

  	crystalcharm: {
    title: 'Crystal Charm',
    svg: '../maps/act-3/Crystal Charm.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 199, x: 695, title: 'Badlands', targetMap: 'badlands', showLabel: true},
		{ type: 'dungeon', y: 287, x: 434, title: 'Crystal Mine Level 1', targetMap: 'crystalminelevel1', showLabel: true},
		{ type: 'dungeon', y: 955, x: 545, title: 'The Junkyard', targetMap: 'thejunkyard', showLabel: true},
		{ type: 'well',  y: 82, x: 528, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 130, x: 344, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 311, x: 299, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 428, x: 559, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 606, x: 413, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 744, x: 562, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 205, x: 642, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 343, x: 351, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 508, x: 319, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 737, x: 541, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 171, x: 651, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
	crystalminelevel1: {
    title: 'Crystal Mine Level 1',
    svg: '../maps/act-3/Crystal Mine Level 1.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 475, x: 763, title: 'Crystal Charm', targetMap: 'crystalcharm', showLabel: true},
		{ type: 'dungeon', y: 836, x: 369, title: 'Crystal Mine Level 2', targetMap: 'crystalminelevel2', showLabel: true},
		{ type: 'well',  y: 590, x: 179, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 448, x: 848, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 111, x: 601, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 382, x: 419, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
  crystalminelevel2: {
    title: 'Crystal Mine Level 2',
    svg: '../maps/act-3/Crystal Mine Level 2.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 882, x: 418, title: 'Crystal Mine Level 1', targetMap: 'crystalminelevel1', showLabel: true},
		{ type: 'dungeon', y: 315, x: 224, title: 'Crystal Mine Level 3', targetMap: 'crystalminelevel3', showLabel: true},
		{ type: 'well',  y: 262, x: 224, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 672, x: 638, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 301, x: 641, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
  crystalminelevel3: {
    title: 'Crystal Mine Level 3',
    svg: '../maps/act-3/Crystal Mine Level 3.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 587, x: 63, title: 'Crystal Mine Level 2', targetMap: 'crystalminelevel2', showLabel: true},
		{ type: 'dungeon', y: 615, x: 916, title: 'Crystal Charm', targetMap: 'crystalcharm', showLabel: true},
		{ type: 'well',  y: 690, x: 768, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 291, x: 384, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 555, x: 932, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
   thejunkyard: {
    title: 'The Junkyard',
    svg: '../maps/act-3/The Junkyard.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 112, x: 637, title: 'Crystal Charm', targetMap: 'crystalcharm', showLabel: true},
		{ type: 'dungeon', y: 98, x: 415, title: 'Salvagers Trove', targetMap: 'salvagerstrove', showLabel: true},
		{ type: 'dungeon', y: 737, x: 458, title: 'Giants Maw', targetMap: 'giantsmaw', showLabel: true},
		{ type: 'dungeon', y: 969, x: 592, title: 'Windy Canyon', targetMap: 'windycanyon', showLabel: true},
		{ type: 'well',  y: 199, x: 489, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 72, x: 333, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 297, x: 253, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 476, x: 269, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 711, x: 504, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 834, x: 634, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 317, x: 325, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 601, x: 437, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 578, x: 546, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 81, x: 588, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
    salvagerstrove: {
    title: 'Salvagers Trove',
    svg: '../maps/act-3/Salvagers Trove.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 469, x: 271, title: 'The Junkyard', targetMap: 'thejunkyard', showLabel: true},
    ],
  },
  
  
    giantsmaw: {
    title: 'Giants Maw',
    svg: '../maps/act-3/Giants Maw.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 871, x: 567, title: 'The Junkyard', targetMap: 'thejunkyard', showLabel: true},
    ],
  },
  
    windycanyon: {
    title: 'Windy Canyon',
    svg: '../maps/act-3/Windy Canyon.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 770, x: 496, title: 'The Junkyard', targetMap: 'thejunkyard', showLabel: true},
		{ type: 'dungeon', y: 402, x: 773, title: 'Windy Canyon 2', targetMap: 'windycanyon2', showLabel: true},
    ],
  },
  
  
    windycanyon2: {
    title: 'Windy Canyon 2',
    svg: '../maps/act-3/Windy Canyon-2.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 715, x: 224, title: 'Windy Canyon', targetMap: 'windycanyon', showLabel: true},
		{ type: 'dungeon', y: 232, x: 785, title: 'Windy Canyon 3', targetMap: 'windycanyon3', showLabel: true},
		{ type: 'dungeon', y: 894, x: 482, title: 'Plundered Tomb', targetMap: 'plunderedtomb', showLabel: true},
    ],
  },
  
    plunderedtomb: {
    title: 'Plundered Tomb',
    svg: '../maps/act-3/Plundered Tomb.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 633, x: 679, title: 'Windy Canyon 2', targetMap: 'windycanyon2', showLabel: true},
    ],
  },
  
    windycanyon3: {
    title: 'Windy Canyon 3',
    svg: '../maps/act-3/Windy Canyon-3.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 907, x: 248, title: 'Windy Canyon 2', targetMap: 'windycanyon2', showLabel: true},
		{ type: 'dungeon', y: 293, x: 738, title: 'The Summit', targetMap: 'thesummit', showLabel: true},
    ],
  },
  
    thesummit: {
    title: 'The Summit',
    svg: '../maps/act-3/The Summit.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 249, x: 198, title: 'Windy Canyon 3', targetMap: 'windycanyon3', showLabel: true},
		{ type: 'dungeon', y: 655, x: 179, title: 'Seekers Sanctuary', targetMap: 'seekerssanctuary', showLabel: true},
		{ type: 'dungeon', y: 682, x: 782, title: 'Forsaken Sanctuary', targetMap: 'forsakensanctuary', showLabel: true},
		{ type: 'dungeon', y: 681, x: 940, title: 'Halls of the Withered', targetMap: 'hallsofthewithered', showLabel: true},
		{ type: 'well',  y: 438, x: 244, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 526, x: 93, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 765, x: 554, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 629, x: 729, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 414, x: 97, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 723, x: 385, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 274, x: 150, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
    seekerssanctuary: {
    title: 'Seekers Sanctuary',
    svg: '../maps/act-3/Seekers Sanctuary.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 772, x: 206, title: 'The Summit', targetMap: 'thesummit', showLabel: true},
    ],
  },
  
    forsakensanctuary: {
    title: 'Forsaken Sanctuary',
    svg: '../maps/act-3/Forsaken Sanctuary.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 772, x: 206, title: 'The Summit', targetMap: 'thesummit', showLabel: true},
    ],
  },
  
    hallsofthewithered: {
    title: 'Halls of the Withered',
    svg: '../maps/act-3/Halls of the Withered.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 97, x: 470, title: 'The Summit', targetMap: 'thesummit', showLabel: true},
		{ type: 'dungeon', y: 833, x: 618, title: 'Drifters Sanctuary', targetMap: 'drifterssanctuary', showLabel: true},
		{ type: 'well',  y: 100, x: 497, title: 'Well', desc: 'Refilling flasks', showLabel: true},
    ],
  },
  
    drifterssanctuary: {
    title: 'Drifters Sanctuary',
    svg: '../maps/act-3/Drifters Sanctuary.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 685, x: 852, title: 'Halls of the Withered', targetMap: 'hallsofthewithered', showLabel: true},
		{ type: 'dungeon', y: 691, x: 318, title: 'The Summit', targetMap: 'thesummit', showLabel: true},
		{ type: 'well',  y: 632, x: 844, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 284, x: 272, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 574, x: 181, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 636, x: 578, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 652, x: 893, title: 'Portal', desc: 'Fast travel' },
		{ type: 'boss',  y: 640, x: 261, title: 'Boss', desc: 'Boss', showLabel: true},
    ],
  },
  
  /*ACT-4*/
  
  	shantytown: {
    title: 'Shanty Town',
    svg: '../maps/act-4/Shanty Town.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 636, x: 842, title: 'The Eroding Stream', targetMap: 'theerodingstream', showLabel: true},
		{ type: 'well',  y: 553, x: 450, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'portal',  y: 590, x: 396, title: 'Portal', desc: 'Fast travel' },
		{ type: 'stash',  y: 628, x: 314, title: 'Stash', desc: 'Storage', showLabel: true },
		{ type: 'merchant',  y: 690, x: 388, title: 'Merchant', desc: 'Repair/disassembly of items', showLabel: true },
		{ type: 'terminal',  y: 637, x: 246, title: 'Terminal', desc: 'Moving around the world', showLabel: true },
    ],
  },
  
    theerodingstream: {
    title: 'The Eroding Stream',
    svg: '../maps/act-4/The Eroding Stream.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 107, x: 663, title: 'Shanty Town', targetMap: 'shantytown', showLabel: true},
		{ type: 'dungeon', y: 554, x: 282, title: 'Dead Woods', targetMap: '', showLabel: true},
		{ type: 'dungeon', y: 944, x: 494, title: 'Blighted Plains', targetMap: 'blightedplains', showLabel: true},
		{ type: 'well',  y: 214, x: 534, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 451, x: 653, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 773, x: 774, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 245, x: 399, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 644, x: 707, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
	blightedplains: {
    title: 'Blighted Plains',
    svg: '../maps/act-4/Blighted Plains.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 137, x: 77, title: 'The Eroding Stream', targetMap: 'theerodingstream', showLabel: true},
		{ type: 'dungeon', y: 840, x: 607, title: 'Depleted Mine', targetMap: 'depletedmine', showLabel: true},
		{ type: 'dungeon', y: 897, x: 845, title: 'Lost Highway', targetMap: 'losthighway', showLabel: true},
		{ type: 'well',  y: 271, x: 270, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 352, x: 520, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 475, x: 844, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 723, x: 363, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 707, x: 649, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 317, x: 130, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 233, x: 737, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 509, x: 250, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 614, x: 611, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 832, x: 370, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 176, x: 157, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
  depletedmine: {
    title: 'Depleted Mine',
    svg: '../maps/act-4/Depleted Mine.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 707, x: 773, title: 'Blighted Plains', targetMap: 'blightedplains', showLabel: true},
    ],
  },
  
  losthighway: {
    title: 'Lost Highway',
    svg: '../maps/act-4/Lost Highway.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 85, x: 555, title: 'Blighted Plains', targetMap: 'blightedplains', showLabel: true},
		{ type: 'dungeon', y: 946, x: 390, title: 'Mountain Tunnel', targetMap: 'mountaintunnel', showLabel: true},
		{ type: 'well',  y: 229, x: 728, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 430, x: 626, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 628, x: 629, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 563, x: 338, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 877, x: 214, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 809, x: 591, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 285, x: 444, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 486, x: 935, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 604, x: 664, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 676, x: 348, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 819, x: 230, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 67, x: 596, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
	mountaintunnel: {
    title: 'Mountain Tunnel',
    svg: '../maps/act-4/Mountain Tunnel.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 483, x: 547, title: 'Lost Highway', targetMap: 'losthighway', showLabel: true},
		{ type: 'dungeon', y: 651, x: 798, title: 'Drainage Tunnel', targetMap: 'drainagetunnel', showLabel: true},
		{ type: 'dungeon', y: 603, x: 908, title: 'Ghost Town', targetMap: 'ghosttown', showLabel: true},
		{ type: 'shrine',   y: 461, x: 631, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
	drainagetunnel: {
    title: 'Drainage Tunnel',
    svg: '../maps/act-4/Drainage Tunnel.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 631, x: 94, title: 'Mountain Tunnel', targetMap: 'mountaintunnel', showLabel: true},
		{ type: 'well',  y: 191, x: 883, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 347, x: 691, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
	ghosttown: {
    title: 'Ghost Town',
    svg: '../maps/act-4/Ghost Town.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 374, x: 919, title: 'Mountain Tunnel', targetMap: 'mountaintunnel', showLabel: true},
		{ type: 'dungeon', y: 633, x: 542, title: 'Haunted Metro', targetMap: 'hauntedmetro', showLabel: true},
		{ type: 'dungeon', y: 817, x: 221, title: 'Broken Bridge', targetMap: 'brokenbridge', showLabel: true},
		{ type: 'dungeon', y: 296, x: 679, title: 'Ghost Town Sewers', targetMap: 'ghosttownsewers', showLabel: true},
		{ type: 'well',  y: 442, x: 701, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 298, x: 320, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 655, x: 311, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 253, x: 591, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 482, x: 484, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 490, x: 254, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 282, x: 915, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
	hauntedmetro: {
    title: 'Haunted Metro',
    svg: '../maps/act-4/Haunted Metro.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 462, x: 916, title: 'Ghost Town', targetMap: 'ghosttown', showLabel: true},
		{ type: 'dungeon', y: 381, x: 72, title: 'Ghost Town', targetMap: 'ghosttown', showLabel: true},
    ],
  },
  
	brokenbridge: {
    title: 'Broken Bridge',
    svg: '../maps/act-4/Broken Bridge.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 155, x: 252, title: 'Ghost Town', targetMap: 'ghosttown', showLabel: true},
		{ type: 'dungeon', y: 955, x: 472, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
		{ type: 'well',  y: 214, x: 389, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 260, x: 595, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 658, x: 607, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 812, x: 399, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 251, x: 477, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 706, x: 608, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 693, x: 306, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
    ],
  },
  
	ghosttownsewers: {
    title: 'Ghost Town Sewers',
    svg: '../maps/act-4/Ghost Town Sewers.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 265, x: 629, title: 'Ghost Town', targetMap: 'ghosttown', showLabel: true},
    ],
  },
  
	thecitycore: {
    title: 'The City Core',
    svg: '../maps/act-4/The City Core.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 218, x: 115, title: 'Broken Bridge', targetMap: 'brokenbridge', showLabel: true},
		{ type: 'dungeon', y: 285, x: 142, title: 'Abandoned Metro 1', targetMap: 'abandonedmetro1', showLabel: true},
		{ type: 'dungeon', y: 540, x: 113, title: 'Abandoned Metro 2', targetMap: 'abandonedmetro2', showLabel: true},
		{ type: 'dungeon', y: 889, x: 411, title: 'Abandoned Metro 3', targetMap: 'abandonedmetro3', showLabel: true},
		{ type: 'dungeon', y: 550, x: 763, title: 'Abandoned Metro 4', targetMap: 'abandonedmetro4', showLabel: true},
		{ type: 'dungeon', y: 597, x: 414, title: 'Central Station', targetMap: 'centralstation', showLabel: true},
		{ type: 'well',  y: 120, x: 375, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 310, x: 658, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 361, x: 252, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 422, x: 757, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'well',  y: 810, x: 666, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'shrine',   y: 248, x: 500, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 337, x: 200, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 525, x: 287, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 787, x: 387, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'shrine',   y: 589, x: 715, title: 'Shrine', desc: 'Provides a temporary character boost', showLabel: true },
		{ type: 'portal',  y: 152, x: 138, title: 'Portal', desc: 'Fast travel' },
    ],
  },
  
	abandonedmetro1: {
    title: 'Abandoned Metro 1',
    svg: '../maps/act-4/Abandoned Metro-1.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 656, x: 153, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
    ],
  },
  
  abandonedmetro2: {
    title: 'Abandoned Metro 2',
    svg: '../maps/act-4/Abandoned Metro-2.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 656, x: 153, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
    ],
  },
  
  abandonedmetro3: {
    title: 'Abandoned Metro 3',
    svg: '../maps/act-4/Abandoned Metro-3.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 656, x: 153, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
    ],
  },
  
  abandonedmetro4: {
    title: 'Abandoned Metro 4',
    svg: '../maps/act-4/Abandoned Metro-4.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 656, x: 153, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
    ],
  },
  
	centralstation: {
    title: 'Central Station',
    svg: '../maps/act-4/Central Station.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 656, x: 153, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
		{ type: 'dungeon', y: 656, x: 153, title: 'The Underground', targetMap: 'theunderground', showLabel: true},
		{ type: 'well',  y: 513, x: 347, title: 'Well', desc: 'Refilling flasks', showLabel: true},
    ],
  },
  
	theunderground: {
    title: 'The Underground',
    svg: '../maps/act-4/The Underground.svg',
    bounds: [[0, 0], [1000, 1000]],
    points: [
		{ type: 'dungeon', y: 685, x: 852, title: 'Central Station', targetMap: 'centralstation', showLabel: true},
		{ type: 'dungeon', y: 656, x: 153, title: 'The City Core', targetMap: 'thecitycore', showLabel: true},
		{ type: 'well',  y: 574, x: 181, title: 'Well', desc: 'Refilling flasks', showLabel: true},
		{ type: 'portal',  y: 652, x: 893, title: 'Portal', desc: 'Fast travel' },
		{ type: 'boss',  y: 640, x: 261, title: 'Boss', desc: 'Boss', showLabel: true},
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
    const HIDDEN_TYPES = ['terminal', 'boss', 'merchant', 'stash'];

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
