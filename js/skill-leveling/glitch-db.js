(() => {
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
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  const byCategory = {
    Movement: [
      {
        id: 'cloud_cog',
        name: 'Cloud Cog',
        categories: ['Movement'],
        rarity: 'Legendary',
        image: "./img/glitches/Movement Crest.png",
        modifiers: {
          movementSpeedPercent: 5,
          previousNodeGainPercent: 24,
          costPercent: -3,
          attackSpeedIfUsedMovementRecentlyPercent: 3,
        },
        desc:
          'Movement Crest (Movement)\n\nRequirements: Level 10\n\nUNCOMMON AFFIXES\nYou gain 5% increased Movement Speed\nPrevious Node gains +24% to Stats\n\nRARE AFFIXES\n3% decreased Skill Resource Cost\n3% increased Attack Speed if you\'ve used a Movement Skill Recently'
      }
    ],

    Aether: [
      {
        id: 'cloud_emblem',
        name: 'Cloud Emblem',
        categories: ['Aether'],
        rarity: 'Legendary',
        image: "./img/glitches/Aether Crest.png",
        modifiers: {
          dazzleChance: 3,
          extraAetherDamageFromDamagePercent: 7,
          dazzleDurationPercent: 7,
        },
        desc:
          'Aether Crest (Aether)\n\nRequirements: Level 10\n\nUNCOMMON AFFIXES\n3% increased Dazzle Chance\nGain +7% of Damage as Extra Aether Damage\n\nRARE AFFIXES\n7% increased Dazzle Duration'
      }
    ],

    Ranged: [
      {
        id: 'blood_orb',
        name: 'Blood Orb',
        categories: ['Ranged'],
        rarity: 'Legendary',
        image: "./img/glitches/Ranged Crest.png",
        modifiers: {
          costPercent: -3,
          lifeOnKillFlat: 3,
          aetherOnKillFlat: 4,
        },
        desc:
          'Ranged Crest (Ranged)\n\nRequirements: Level 5\n\nUNCOMMON AFFIXES\n3% decreased Skill Resource Cost\nGain +3 Life on Kill\n\nRARE AFFIXES\nGain +4 Aether on Kill'
      },
		  {
		  id: 'sky_heart',
		  name: 'Sky Heart',
		  categories: ['Ranged'],
		  rarity: 'Legendary',
		  image: "./img/glitches/Ranged Crest.png",
		  modifiers: {
			lifeOnKillFlat: 3,
			aetherOnKillFlat: 3,
			skillLevelFlat: 1,
			critDamagePercent: 5,
		  },
		  desc:
			'Sky Heart\n\nRanged Crest (Ranged)\n\nCan be socketed into Skills with matching Tag.\n\nRequirements: Level 5\n\nUNCOMMON AFFIXES\nGain +3 Life on Kill\nGain +3 Aether on Kill\n\nRARE AFFIXES\n+1 to all Skill Levels\n5% increased Critical Hit Damage'
		}
    ],

    Spell: [
      {
        id: 'lunar_emblem',
        name: 'Lunar Emblem',
        categories: ['Spell'],
        rarity: 'Legendary',
        image: "./img/glitches/Spell Crest.png",
        modifiers: {
          critDamagePercent: 4,
          skillLevelFlat: 1,
          aetherOnHitFlat: 1,
        },
        desc:
          'Lunar Emblem\n\nSpell Crest (Spell)\n\nCan be socketed into Skills with matching Tag.\n\nRequirements: Level 10\n\nUNCOMMON AFFIXES\n4% increased Critical Hit Damage\n+1 to all Skill Levels\n\nRARE AFFIXES\nGain +1 Aether on Hit'
      }
    ],
	
	Projectile: [
  {
    id: 'maelstrom_eye',
    name: 'Maelstrom Eye',
    categories: ['Projectile'],
    rarity: 'Legendary',
    image: "./img/glitches/Projectile Crest.png",
    modifiers: {
      skillLevelFlat: 1,
      projectilePierceChancePercent: 15,
      skillResourceCostPercent: -3,
    },
    desc:
      'Maelstrom Eye\n\nProjectile Crest (Projectile)\n\nCan be socketed into Skills with matching Tag.\n\nRequirements: Level 10\n\nUNCOMMON AFFIXES\n+1 to all Skill Levels\n+15% Projectile Pierce Chance\n\nRARE AFFIXES\n3% decreased Skill Resource Cost'
  }
],

	Melee: [
		{
		  id: 'blood_heart',
		  name: 'Blood Heart',
		  categories: ['Melee'],
		  rarity: 'Legendary',
		  image: "./img/glitches/Melee Crest.png",
		  modifiers: {
			skillLevelFlat: 1,
			previousNodeStatsPercent: 13,
			lifeOnKillFlat: 3,
			aetherOnKillFlat: 5,
		  },
		  desc:
			'Blood Heart\n\nMelee Crest (Melee)\n\nCan be socketed into Skills with matching Tag.\n\nRequirements: Level 5\n\nUNCOMMON AFFIXES\n+1 to all Skill Levels\nPrevious Node gains +13% to Stats\n\nRARE AFFIXES\nGain +3 Life on Kill\nGain +5 Aether on Kill'
		}
],

	Cooldown: [
		{
		  id: 'scalers_seal_of_the_skyfarer',
		  name: "Scaler's Seal of the Skyfarer",
		  categories: ['Cooldown'],
		  rarity: 'Rare',
		  image: "./img/glitches/Cooldown Crest.png",
		  modifiers: {
			skillLevelFlat: 1,
			castSpeedDuringCooldownPercent: 3,
		  },
		  desc:
			"Scaler's Seal of the Skyfarer\n\nCooldown Crest (Cooldown)\n\nCan be socketed into Skills with matching Tag.\n\nUNCOMMON AFFIXES\n+1 to all Skill Levels\nYou gain 3% increased Cast Speed during Skill Cooldown"
		}
],

	Lightning: [
		{
		  id: 'lashing_eye_of_tingle',
		  name: 'Lashing Eye of Tingle',
		  categories: ['Lightning'],
		  rarity: 'Rare',
		  image: "./img/glitches/Lightning Crest.png",
		  modifiers: {
			extraLightningDamagePercent: 8,
			shockChancePercent: 5,
		  },
		  desc:
			'Lashing Eye of Tingle\n\nLightning Crest (Lightning)\n\nCan be socketed into Skills with matching Tag.\n\nRequirements: Level 10\n\nUNCOMMON AFFIXES\nGain +8% of Damage as Extra Lightning Damage\n5% increased Shock Chance'
		}
],

	Aura: [
		{
		  id: 'heatfast_seal_of_the_supporter',
		  name: 'Heatfast Seal of the Supporter',
		  categories: ['Aura'],
		  rarity: 'Rare',
		  image: "./img/glitches/Aura Crest.png",
		  modifiers: {
			partyFireResistancePercent: 3,
			previousNodeStatsPercent: 30,
		  },
		  desc:
			'Heatfast Seal of the Supporter\n\nAura Crest (Aura)\n\nCan be socketed into Skills with matching Tag.\n\nRequirements: Level 15\n\nUNCOMMON AFFIXES\nYou and Allies gain +3% Fire Resistance\nPrevious Node gains +30% to Stats'
		}
],

	Physical: [
		{
		  id: 'scalers_sphere_of_the_helper',
		  name: "Scaler's Sphere of the Helper",
		  categories: ['Physical'],
		  rarity: 'Legendary',
		  image: "./img/glitches/Physical Crest.png",
		  modifiers: {
			skillLevelFlat: 1,
			previousNodeStatsPercent: 11,
		  },
		  desc:
			"Scaler's Sphere of the Helper\n\nPhysical Crest (Physical)\n\nCan be socketed into Skills with matching Tag.\n\nUNCOMMON AFFIXES\n+1 to all Skill Levels\nPrevious Node gains +11% to Stats"
		}
],

  };

  window.GLITCH_DB = Object.freeze({ byCategory });
})();
