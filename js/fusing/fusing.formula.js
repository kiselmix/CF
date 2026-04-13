// ===== Data =====
  const ITEMS = [
        {
      id: "essential_element",
      name: "Essential Element",
      img: "img/fusing/essential-element.png",
      qty: 1,
      description:
        "Fuse multiples of this item into a higher tier item. Can be obtained by disassembling items.",
      stats: [
      ],
      recipe: []
    },
      {
      id: "shard",
      name: "Shard",
      img: "img/fusing/shard.png",
      qty: 1,
      description:
        "In-game currency.",
      stats: [
      ],
      recipe: []
    },
	{
      id: "decryption_key",
      name: "Decryption Key",
      img: "img/fusing/decryption-key.png",
      qty: 1,
      description:
        "Decrypt an item by right-clicking this decryption key and left-clicking the encrypted item.",
      stats: [
      ],
      recipe: [
	  { id: "essential_element", count: 9 },
		{ id: "shard", count: 9 }]
    },
    {
      id: "chipped_frostcore",
      name: "Chipped Frostcore",
      img: "img/fusing/Chipped-Frostcore.png",
      qty: 12,
      requirements: "Level 10",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 2 to 3 Cold Damage" },
        { slot: "Armor", text: "+3 Dexterity" },
        { slot: "Off-hand", text: "+5% Cold Resistance" },
        { slot: "Flask", text: "You gain +10% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
		{ id: "essential_element", count: 3 },
		{ id: "shard", count: 90 }
		]
    },
	    {
      id: "chipped_ironcore",
      name: "Chipped Ironcore",
      img: "img/fusing/Chipped-Ironcore.png",
      qty: 12,
      requirements: "Level 10",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 2 to 3 Physical Damage" },
        { slot: "Armor", text: "+5 to Maximum Life" },
        { slot: "Off-hand", text: "Reflect +5 Physical Damage" },
        { slot: "Flask", text: "You gain +10% Chance to Negate Bleeding during Flask Effect" }
      ],
      recipe: [
	  { id: "essential_element", count: 3 },
		{ id: "shard", count: 90 }]
    },
		    {
      id: "chipped_stormcore",
      name: "Chipped Stormcore",
      img: "img/fusing/Chipped-Stormcore.png",
      qty: 12,
      requirements: "Level 10",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 1 to 4 Lightning Damage" },
        { slot: "Armor", text: "+3 Intelligence" },
        { slot: "Off-hand", text: "+5% Lightning Resistance" },
        { slot: "Flask", text: "You gain +10% Chance to Negate Shocks during Flask Effect" }
      ],
      recipe: [
	  { id: "essential_element", count: 3 },
		{ id: "shard", count: 90 }]
    },
	
	{
      id: "chipped_skycore",
      name: "Chipped Skycore",
      img: "img/fusing/Chipped-Skycore.png",
      qty: 12,
      requirements: "Level 10",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 1 to 4 Aether Damage" },
        { slot: "Armor", text: "+5 to Maximum Aether" },
        { slot: "Off-hand", text: "+5% Aether Resistance" },
        { slot: "Flask", text: "You gain +10% Chance to Negate Dazzling during Flask Effect" }
      ],
      recipe: [
	  { id: "essential_element", count: 3 },
		{ id: "shard", count: 90 }]
    },
	{
      id: "chipped_flamecore",
      name: "Chipped Flamecore",
      img: "img/fusing/Chipped-Flamecore.png",
      qty: 12,
      requirements: "Level 10",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 1 to 4 Fire Damage" },
        { slot: "Armor", text: "+3 Strength" },
        { slot: "Off-hand", text: "+5% Fire Resistance" },
        { slot: "Flask", text: "You gain +10% Chance to Negate Burns during Flask Effect" }
      ],
      recipe: [
	  { id: "essential_element", count: 3 },
		{ id: "shard", count: 90 }]
    },
	
	
	
	
	
	
	
	
	
    {
      id: "flawed_frostcore",
      name: "Flawed Frostcore",
      img: "img/fusing/Flawed-Frostcore.png",
      qty: 1,
      requirements: "Level 15",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 3 to 4 Cold Damage" },
        { slot: "Armor", text: "+6 Dexterity" },
        { slot: "Off-hand", text: "+10% Cold Resistance" },
        { slot: "Flask", text: "You gain +20% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "chipped_frostcore", count: 3 },
		{ id: "shard", count: 135 }
      ]
    },
	
	   {
      id: "flawed_ironcore",
      name: "Flawed Ironcore",
      img: "img/fusing/Flawed-Ironcore.png",
      qty: 1,
      requirements: "Level 15",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 3 to 4 Physical Damage" },
        { slot: "Armor", text: "+10 to Maximum Life" },
        { slot: "Off-hand", text: "Reflect +10 Physical Damage" },
        { slot: "Flask", text: "You gain +20% Chance to Negate Bleeding during Flask Effect" }
      ],
      recipe: [
        { id: "chipped_ironcore", count: 3 },
		{ id: "shard", count: 135 }
      ]
    },
	
	
	 {
      id: "flawed_stormcore",
      name: "Flawed Stormcore",
      img: "img/fusing/Flawed-Stormcore.png",
      qty: 1,
      requirements: "Level 15",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 1 to 7 Lightning Damage" },
        { slot: "Armor", text: "+6 Intelligence" },
        { slot: "Off-hand", text: "+10% Lightning Resistance" },
        { slot: "Flask", text: "You gain +20% Chance to Negate Shocks during Flask Effect" }
      ],
      recipe: [
        { id: "chipped_stormcore", count: 3 },
		{ id: "shard", count: 135 }
      ]
    },
	
		 {
      id: "flawed_skycore",
      name: "Flawed Skycore",
      img: "img/fusing/Flawed-Skycore.png",
      qty: 1,
      requirements: "Level 15",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 2 to 5 Aether Damage" },
        { slot: "Armor", text: "+10 to Maximum Aether" },
        { slot: "Off-hand", text: "+10% Aether Resistance" },
        { slot: "Flask", text: "You gain +20% Chance to Negate Dazzling during Flask Effect" }
      ],
      recipe: [
        { id: "chipped_skycore", count: 3 },
		{ id: "shard", count: 135 }
      ]
    },
	
	 {
      id: "flawed_flamecore",
      name: "Flawed Flamecore",
      img: "img/fusing/Flawed-Flamecore.png",
      qty: 1,
      requirements: "Level 15",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 2 to 5 Fire Damage" },
        { slot: "Armor", text: "+10 to Maximum Life" },
        { slot: "Off-hand", text: "+10% Fire Resistance" },
        { slot: "Flask", text: "You gain +20% Chance to Negate Burns during Flask Effect" }
      ],
      recipe: [
        { id: "chipped_flamecore", count: 3 },
		{ id: "shard", count: 135 }
      ]
    },
	
	
	
	
		 {
      id: "frostcore",
      name: "Frostcore",
      img: "img/fusing/Frostcore.png",
      qty: 1,
      requirements: "Level 20",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 4 to 6 Cold Damage" },
        { slot: "Armor", text: "+9 Dexterity" },
        { slot: "Off-hand", text: "+15% Cold Resistance" },
        { slot: "Flask", text: "You gain +30% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "flawed_frostcore", count: 3 },
		{ id: "shard", count: 180 }
      ]
    },
	
			 {
      id: "ironcore",
      name: "Ironcore",
      img: "img/fusing/Ironcore.png",
      qty: 1,
      requirements: "Level 20",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 4 to 6 Cold Damage" },
        { slot: "Armor", text: "+9 Dexterity" },
        { slot: "Off-hand", text: "+15% Cold Resistance" },
        { slot: "Flask", text: "You gain +30% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "flawed_ironcore", count: 3 },
		{ id: "shard", count: 180 }
      ]
    },
	
	 {
      id: "stormcore",
      name: "Stormcore",
      img: "img/fusing/Stormcore.png",
      qty: 1,
      requirements: "Level 20",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 4 to 6 Cold Damage" },
        { slot: "Armor", text: "+9 Dexterity" },
        { slot: "Off-hand", text: "+15% Cold Resistance" },
        { slot: "Flask", text: "You gain +30% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "flawed_stormcore", count: 3 },
		{ id: "shard", count: 180 }
      ]
    },
	
	{
      id: "skycore",
      name: "Skycore",
      img: "img/fusing/Skycore.png",
      qty: 1,
      requirements: "Level 20",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 4 to 6 Cold Damage" },
        { slot: "Armor", text: "+9 Dexterity" },
        { slot: "Off-hand", text: "+15% Cold Resistance" },
        { slot: "Flask", text: "You gain +30% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "flawed_skycore", count: 3 },
		{ id: "shard", count: 180 }
      ]
    },
	
	{
      id: "flamecore",
      name: "Flamecore",
      img: "img/fusing/Flamecore.png",
      qty: 1,
      requirements: "Level 20",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 4 to 6 Cold Damage" },
        { slot: "Armor", text: "+9 Dexterity" },
        { slot: "Off-hand", text: "+15% Cold Resistance" },
        { slot: "Flask", text: "You gain +30% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "flawed_flamecore", count: 3 },
		{ id: "shard", count: 180 }
      ]
    },
	
	
	
	
	{
      id: "flawless_frostcore",
      name: "Flawless Frostcore",
      img: "img/fusing/Flawless-Frostcore.png",
      qty: 1,
      requirements: "Level 25",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 7 to 8 Cold Damage" },
        { slot: "Armor", text: "+12 Dexterity" },
        { slot: "Off-hand", text: "+20% Cold Resistance" },
        { slot: "Flask", text: "You gain +40% Chance to Negate Chills during Flask Effect" }
      ],
      recipe: [
        { id: "frostcore", count: 3 },
		{ id: "shard", count: 225 }
      ]
    },
	
	{
      id: "flawless_ironcore",
      name: "Flawless Ironcore",
      img: "img/fusing/Flawless-Ironcore.png",
      qty: 1,
      requirements: "Level 25",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 5 to 10 Physical Damage" },
        { slot: "Armor", text: "+20 to Maximum Life" },
        { slot: "Off-hand", text: "Reflect +20 Physical Damage" },
        { slot: "Flask", text: "You gain +40% Chance to Negate Bleeding during Flask Effect" }
      ],
      recipe: [
        { id: "ironcore", count: 3 },
		{ id: "shard", count: 225 }
      ]
    },
	
	
		{
      id: "flawless_stormcore",
      name: "Flawless Stormcore",
      img: "img/fusing/Flawless-Stormcore.png",
      qty: 1,
      requirements: "Level 25",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 1 to 17 Lightning Damage" },
        { slot: "Armor", text: "+12 Intelligence" },
        { slot: "Off-hand", text: "+20% Lightning Resistance" },
        { slot: "Flask", text: "You gain +40% Chance to Negate Shocks during Flask Effect" }
      ],
      recipe: [
        { id: "stormcore", count: 3 },
		{ id: "shard", count: 225 }
      ]
    },
	
		{
      id: "flawless_skycore",
      name: "Flawless Skycore",
      img: "img/fusing/Flawless-Skycore.png",
      qty: 1,
      requirements: "Level 25",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 3 to 12 Aether Damage" },
        { slot: "Armor", text: "+20 to Maximum Aether" },
        { slot: "Off-hand", text: "+20% Aether Resistance" },
        { slot: "Flask", text: "You gain +40% Chance to Negate Dazzling during Flask Effect" }
      ],
      recipe: [
        { id: "skycore", count: 3 },
		{ id: "shard", count: 225 }
      ]
    },
	
	{
      id: "flawless_flamecore",
      name: "Flawless Flamecore",
      img: "img/fusing/Flawless-Flamecore.png",
      qty: 1,
      requirements: "Level 25",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "Adds 4 to 11 Fire Damage" },
        { slot: "Armor", text: "+12 Strength" },
        { slot: "Off-hand", text: "+20% Fire Resistance" },
        { slot: "Flask", text: "You gain +40% Chance to Negate Burns during Flask Effect" }
      ],
      recipe: [
        { id: "flamecore", count: 3 },
		{ id: "shard", count: 225 }
      ]
    },
	
	
	
	
			{
      id: "perfect-frostcore",
      name: "Perfect Frostcore",
      img: "img/fusing/Perfect-Frostcore.png",
      qty: 1,
      requirements: "Level 30",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "" },
        { slot: "Armor", text: "" },
        { slot: "Off-hand", text: "" },
        { slot: "Flask", text: "" }
      ],
      recipe: [
        { id: "flawless_frostcore", count: 3 },
		{ id: "shard", count: 270 }
      ]
    },
	{
      id: "perfect-ironcore",
      name: "Perfect Ironcore",
      img: "img/fusing/Perfect-Ironcore.png",
      qty: 1,
      requirements: "Level 30",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "" },
        { slot: "Armor", text: "" },
        { slot: "Off-hand", text: "" },
        { slot: "Flask", text: "" }
      ],
      recipe: [
        { id: "flawless_ironcore", count: 3 },
		{ id: "shard", count: 270 }
      ]
    },
	{
      id: "perfect-stormcore",
      name: "Perfect Stormcore",
      img: "img/fusing/Perfect-Stormcore.png",
      qty: 1,
      requirements: "Level 30",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "" },
        { slot: "Armor", text: "" },
        { slot: "Off-hand", text: "" },
        { slot: "Flask", text: "" }
      ],
      recipe: [
        { id: "flawless_stormcore", count: 3 },
		{ id: "shard", count: 270 }
      ]
    },
	{
      id: "perfect-skycore",
      name: "Perfect Skycore",
      img: "img/fusing/Perfect-Skycore.png",
      qty: 1,
      requirements: "Level 30",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "" },
        { slot: "Armor", text: "" },
        { slot: "Off-hand", text: "" },
        { slot: "Flask", text: "" }
      ],
      recipe: [
        { id: "flawless_skycore", count: 3 },
		{ id: "shard", count: 270 }
      ]
    },
		{
      id: "perfect-flamecore",
      name: "Perfect Flamecore",
      img: "img/fusing/Perfect-Flamecore.png",
      qty: 1,
      requirements: "Level 30",
      description:
        "Can be socketed into items. Can be used to upgrade the quality of items. Multiples of the same type and grade can be fused into a higher grade.",
      stats: [
        { slot: "Weapon", text: "" },
        { slot: "Armor", text: "" },
        { slot: "Off-hand", text: "" },
        { slot: "Flask", text: "" }
      ],
      recipe: [
        { id: "flawless_flamecore", count: 3 },
		{ id: "shard", count: 270 }
      ]
    },
	
	
	
	
	
	
	 {
      id: "Alchemist_Lesser_Module",
      name: "Alchemist's Lesser Module",
      img: "img/fusing/Alchemist-Lesser-Module.png",
      qty: 1,
      requirements: "",
      description:
        "Upgrades a common item or skill to uncommon rarity.",
      stats: [
      ],
      recipe: [
      ]
    },
	
		 {
      id: "Alchemist_Module",
      name: "Alchemist's Module",
      img: "img/fusing/Alchemist-Module.png",
      qty: 1,
      requirements: "",
      description:
        "Upgrades an uncommon item or skill to rare rarity.",
      stats: [
      ],
      recipe: [
		{ id: "Alchemist_Lesser_Module", count: 5 },
		{ id: "shard", count: 117 }
      ]
    },
	
	 {
      id: "Alchemist_Greater_Module",
      name: "Alchemist's Greater Module",
      img: "img/fusing/Alchemist-Greater-Module.png",
      qty: 1,
      requirements: "",
      description:
        "",
      stats: [
      ],
      recipe: [
		{ id: "Alchemist_Module", count: 5 },
		{ id: "shard", count: 162 }
      ]
    },
	
	
  ];

  const byId = Object.fromEntries(ITEMS.map(x => [x.id, x]));

  // ===== DOM =====
  const itemGrid = document.getElementById('itemGrid');
  const itemSummary = document.getElementById('itemSummary');

  const selImg = document.getElementById('selImg');
  const selName = document.getElementById('selName');
  const selReq  = document.getElementById('selReq');

  const recipeEl = document.getElementById('recipe');
  const formulaStatus = document.getElementById('formulaStatus');

  const tooltip = document.getElementById('tooltip');

  // Track last pointer position so tooltip doesn't jump on click/focus
  let lastPoint = { x: Math.round(window.innerWidth * 0.5), y: Math.round(window.innerHeight * 0.35) };
  window.addEventListener('pointermove', (e) => { lastPoint = { x: e.clientX, y: e.clientY }; }, { passive: true });
  window.addEventListener('pointerdown', (e) => { lastPoint = { x: e.clientX, y: e.clientY }; }, { passive: true });

  let selectedId = "flawed_frostcore";

  // ===== Render items =====
  function renderItems(){
    itemGrid.innerHTML = "";

    for (const item of ITEMS){
      const btn = document.createElement('button');
      btn.type = "button";
      btn.className = "itemBtn";
      btn.dataset.id = item.id;
      btn.setAttribute("aria-label", item.name);

      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;


      btn.appendChild(img);


      btn.addEventListener('click', () => selectItem(item.id));

      // tooltip handlers
      btn.addEventListener('mouseenter', (e) => showTooltip(item, e));
      btn.addEventListener('mousemove', (e) => moveTooltip(e));
      btn.addEventListener('mouseleave', hideTooltip);
      // Keyboard focus: show tooltip near last pointer, not top-left
      btn.addEventListener('focus', () => showTooltip(item, { clientX: lastPoint.x, clientY: lastPoint.y }));
      btn.addEventListener('blur', hideTooltip);

      itemGrid.appendChild(btn);
    }

    syncActive();
  }

  function syncActive(){
    itemGrid.querySelectorAll('.itemBtn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.id === selectedId);
    });
  }

  // ===== Select + formula =====
  function selectItem(id){
    selectedId = id;
    syncActive();
    renderFormula();
  }

  function renderFormula(){
    const item = byId[selectedId];
    if (!item) return;

    selImg.src = item.img;
    selImg.alt = item.name;
    selName.textContent = item.name;
    selReq.textContent = `Requirements: ${item.requirements}`;

    recipeEl.innerHTML = "";

    if (!item.recipe || item.recipe.length === 0){
      formulaStatus.textContent = "No formula (base item)";
      const empty = document.createElement('div');
      empty.className = "small";
      empty.style.color = "var(--muted)";
      empty.textContent = "This item is a base component and is not assembled from other items.";
      recipeEl.appendChild(empty);
      return;
    }

    formulaStatus.textContent = "Components";

    for (const comp of item.recipe){
      const compItem = byId[comp.id];

      const row = document.createElement('div');
      row.className = "recipeRow";

      const left = document.createElement('div');
      left.className = "recipeLeft";

      const icon = document.createElement('div');
      icon.className = "compIcon";

      const iconImg = document.createElement('img');
      iconImg.src = compItem?.img ?? "";
      iconImg.alt = compItem?.name ?? comp.id;

      icon.appendChild(iconImg);

      const meta = document.createElement('div');

      const nm = document.createElement('div');
      nm.className = "compName";
      nm.textContent = compItem?.name ?? comp.id;

      const sub = document.createElement('div');
      sub.className = "compNeed";
      sub.textContent = "Component";

      meta.appendChild(nm);
      meta.appendChild(sub);

      left.appendChild(icon);
      left.appendChild(meta);

      const right = document.createElement('div');
      right.className = "compCount";
      right.textContent = `×${comp.count}`;

      row.appendChild(left);
      row.appendChild(right);

      // component tooltip
      row.addEventListener('mouseenter', (e) => compItem && showTooltip(compItem, e));
      row.addEventListener('mousemove', moveTooltip);
      row.addEventListener('mouseleave', hideTooltip);

      // click component to jump-select it
      row.style.cursor = "pointer";
      row.addEventListener('click', () => selectItem(comp.id));

      recipeEl.appendChild(row);
    }
  }

  // ===== Tooltip =====
  function tooltipHTML(item){
    const stats = (item.stats || [])
      .slice(0, 6)
      .map(s => `<li><b>${escapeHTML(s.slot)}:</b> ${escapeHTML(s.text)}</li>`)
      .join("");

    return `
      <div class="ttTitle">${escapeHTML(item.name)}</div>
      <p class="ttBody">${escapeHTML(item.description || "")}</p>
      <div class="ttReq">Requirements: <b>${escapeHTML(item.requirements || "-")}</b></div>
      <ul class="ttStats">${stats}</ul>
    `;
  }

  function showTooltip(item, e){
    tooltip.innerHTML = tooltipHTML(item);
    tooltip.classList.add('is-show');
    tooltip.setAttribute("aria-hidden", "false");
    moveTooltip(e);
  }
  function moveTooltip(e){
    const pad = 14;
    const maxX = window.innerWidth - tooltip.offsetWidth - pad;
    const maxY = window.innerHeight - tooltip.offsetHeight - pad;

    const cx = (typeof e?.clientX === 'number') ? e.clientX : lastPoint.x;
    const cy = (typeof e?.clientY === 'number') ? e.clientY : lastPoint.y;
    const x = Math.min(maxX, cx + 16);
    const y = Math.min(maxY, cy + 16);

    tooltip.style.left = x + "px";
    tooltip.style.top  = y + "px";
  }
  function hideTooltip(){
    tooltip.classList.remove('is-show');
    tooltip.setAttribute("aria-hidden", "true");
  }

  function escapeHTML(str){
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ===== Mobile burger menu (same behavior as skills page) =====
  (() => {
    const burger = document.querySelector('.burgerBtn');
    const overlay = document.querySelector('.navOverlay');
    const panel = overlay?.querySelector('.navPanel');
    const closeBtn = overlay?.querySelector('.navClose');

    if (!burger || !overlay || !panel || !closeBtn) return;

    const openMenu = () => {
      overlay.hidden = false;
      document.body.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    };

    const closeMenu = () => {
      overlay.hidden = true;
      document.body.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    };

    burger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) closeMenu();
    });
  })();

  // init
  renderItems();
  renderFormula();
