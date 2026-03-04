
(() => {
  function svgDataUri(text, bg1, bg2){
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${bg1}"/>
            <stop offset="1" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="256" height="256" rx="44" fill="url(#g)"/>
        <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
              font-family="system-ui,Segoe UI,Roboto,Arial" font-size="120" fill="rgba(255,255,255,.92)">${text}</text>
      </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

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
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  const skills = [
	{
	  id: "aether_rain",
	  name: "Aether Rain",
	  image: "./img/skill/Aether Rain.png",

  categories: ["Spell", "AoE", "Cooldown", "Aether"],

	  baseStats: {
		costFlat: 25,          
		costPercent: 0,        
		cooldown: 4,
		damageMin: 3,
		damageMax: 5,
		aoeRadius: 3.6,
		duration: 2,
		damageRate: 1,
		castSpeed: 1,
		range: 15,
		aetherPenetration: 0,
		critChance: 0,
		dazzleChance: 0,
		dazzleDuration: 0,
		dazzleEffect: 0,
		extraDamagePerLevel: 0,
		incomingPhysToColdDuringCooldown: 0,
		incomingPhysToAetherDuringCooldown: 0,
		previousNodeGainPercent: 0,
		incomingPhysToFireDuringCooldown: 0,
		skillResourceCostPercent: 0,
		aoeRadiusPerDestroyedNodePercent: 0,
		aoeRadiusPer10ResourcePercent: 0,
		aoeRadiusPerNearbyEnemyPercent: 0,
		negateChanceDuringCooldown: 0,
	  },

	  nodes: {
		bottom: {
		  title: "Aether Rain",
		  desc: "Call down a destructive rain of Aether on enemies within a targeted area."
			},


		l1a: {
			title: "Dazzle x Critical Hit",
			desc: "Cost: Aether 1\nCost Of Base: Aether 3%\n8% increased Dazzle Chance\n+3% Critical Hit Chance",
			modifiers: {
				costFlat: 1,
				costPercent: 3,
				dazzleChance: 8,
				critChance: 3,
		  }
		},

		l1b: {
			title: "Dazzle x Duration x Effect",
			desc: "Cost: Aether 1\nCost Of Base: Aether 2%\n11% increased Dazzle Chance\n5% increased Dazzle Duration\n4% increased Dazzle Effect",
			modifiers: {
				costFlat: 1,
				costPercent: 2,
				dazzleChance: 11,
				dazzleDuration: 5,
				dazzleEffect: 4,
		  }
		},

		l2a: {
		  title: "Aether Damage x Skill Level",
		  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nGain +1% of Damage as Extra Aether Damage per 1 Skill Level",
		  modifiers: {
			costFlat: 1,
			costPercent: 5,
			extraDamagePerLevel: 1,
		  }
		},

		l2b: {
		  title: "Cast Speed",
		  desc: "Cost: Aether 1\nCost Of Base: Aether 3%\n10% increased Cast Speed",
		  modifiers: {
			costFlat: 1,
			costPercent: 3,
			castSpeedPercent: 10,
		  }
		},

		l2c: { title: "Aether Penetration", desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n+7% Aether Penetration",
		  modifiers: { costFlat: 2, costPercent: 6, aetherPenetration: 7,} },
		  
		l3a: { title:"Aether Penetration", desc:"Cost: Aether 1\nCost Of Base: Aether 4%\n\n+8% Aether Penetration",
               modifiers:{ costFlat:1, costPercent:4, aetherPenetration:8 } },

        l3b: { title:"AoE Radius", desc:"Cost: Aether 1\nCost Of Base: Aether 4%\n\n11% increased AoE Radius",
               modifiers:{ costFlat:1, costPercent:4, aoeRadiusPercent:11 } },

        l3c: { title:"Dazzle Effect", desc:"Cost: Aether 2\nCost Of Base: Aether 8%\n\n9% increased Dazzle Effect",
               modifiers:{ costFlat:2, costPercent:8, dazzleEffect:9 } },

        l3d: { title:"Cast Speed", desc:"Cost: Aether 2\nCost Of Base: Aether 8%\n\n9% increased Cast Speed",
               modifiers:{ costFlat:2, costPercent:8, castSpeedPercent:9 } },
		l4a: { title: "Skill Node Previous Gain", desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nPrevious Node gains +39% to Stats",
		  modifiers: { costFlat: 1, costPercent: 5, previousNodeGainPercent: 39 } },

		l4b: { title: "Incoming Physical to Cold during Cooldown", desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nYou gain +6% of incoming Physical Damage Converted to Cold Damage during Skill Cooldown",
		  modifiers: { costFlat: 3, costPercent: 10, incomingPhysToColdDuringCooldown: 6 } },

		l4c: { title: "Incoming Physical to Aether during Cooldown", desc: "Cost: Aether 2\nCost Of Base: Aether 8%\nYou gain +5% of incoming Physical Damage Converted to Aether Damage during Skill Cooldown",
		  modifiers: { costFlat: 2, costPercent: 8, incomingPhysToAetherDuringCooldown: 5 } },
		  
		l4d: { title: "Incoming Physical to Fire during Cooldown", desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nYou gain +7% of incoming Physical Damage Converted to Fire Damage during Skill Cooldown",
		  modifiers: { costFlat: 1, costPercent: 5, incomingPhysToFireDuringCooldown: 7 } },

		l4e: { title: "Resource Cost Increased", desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n20% increased Skill Resource Cost",
		  modifiers: { costFlat: 2, costPercent: 8, skillResourceCostPercent: 20 } },
		l5a: {
  title: "AoE Radius x Destroyed Node",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n7% increased AoE Radius per 1 Destroyed Node",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    aoeRadiusPerDestroyedNodePercent: 7
  }
},

l5b: {
  title: "AoE Radius x Resource Consumed",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\n4% increased AoE Radius per 10 Resource Consumed by Skill",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    aoeRadiusPer10ResourcePercent: 4
  }
},

l5c: {
  title: "AoE Radius x Nearby Enemy",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n4% increased AoE Radius per 1 Nearby Enemy",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    aoeRadiusPerNearbyEnemyPercent: 4
  }
},

l5d: {
  title: "Negate during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\nYou gain +6% Chance to Negate during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    negateChanceDuringCooldown: 6
  }
},


	  },
	},

{
  id: "lightning_quake",
  name: "Lightning Quake",
  image: "./img/skill/Lightning Quake.png",
  categories: ["AoE", "Melee", "Lightning"],

  baseStats: {
    costFlat: 25,
    costPercent: 0,
    cooldown: 0,
    damageMin: 0,
    damageMax: 0,
    aoeRadius: 4.7,
    duration: 3,
    damageRate: 1,
    range: 15,
    castSpeed: 0,
    attackSpeedPercent: -20,
    outgoingPhysToLightningPercent: 50,
    extraLightningPerLevelPercent: 7,
    skillResourceCostPercent: 0,
    incomingPhysToColdDuringCooldown: 0,
    incomingPhysToAetherDuringCooldown: 0,
    incomingPhysToFireDuringCooldown: 0,
    negateChanceDuringCooldown: 0,
	crushingHitChance: 0,
	crushingHitEffectPercent: 0,
	shockChancePercent: 0,
	shockDurationPercent: 0,
	shockEffectPercent: 0,
	addedPhysicalMin: 0,
	addedPhysicalMax: 0,
	aoeRadiusPercent: 0,
	lightningPenetration: 0,
	stunChancePerLevelPercent: 0,
	damageOnStunPercent: 0,
	physicalDamagePerLevelPercent: 0,
	nextNodeGainPercent: 0,
	skillLevelFlat: 0,
	extraPhysicalPerNearbyEnemyPercent: 0,
	extraPhysicalPerShieldDefensePercent: 0,
	critChanceNearbyPercent: 0,
	critDamageNearbyPercent: 0,
	damageAgainstFullLifePercent: 0,
  },

  nodes: {
    bottom: {
      title: "Lightning Quake",
      desc: "Slam the ground with lightning and watch as enemies within the targeted area are damaged by periodic quakes."
    },

    l1a: {
  title: "Crushing Hit x Effect",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n+6% Crushing Hit Chance\n7% increased Crushing Hit Effect",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    crushingHitChance: 6,
    crushingHitEffectPercent: 7
  }
},
    l1b: {
  title: "Shock x Duration x Effect",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n25% increased Shock Chance\n6% increased Shock Duration\n10% increased Shock Effect",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    shockChancePercent: 25,
    shockDurationPercent: 6,
    shockEffectPercent: 10
  }
},

    l2a: {
  title: "Physical Damage",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nAdds 4 to 5 Physical Damage",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    addedPhysicalMin: 4,
    addedPhysicalMax: 5
  }
},
    l2b: {
  title: "AoE Radius",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n10% increased AoE Radius",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    aoeRadiusPercent: 10
  }
},
    l2c: {
  title: "Crushing Hit",
  desc: "Cost: Aether 1\nCost Of Base: Aether 3%\n+11% Crushing Hit Chance",
  modifiers: {
    costFlat: 1,
    costPercent: 3,
    crushingHitChance: 11
  }
},

l3a: {
  title: "Critical Hit",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n+6% Critical Hit Chance",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    critChance: 6
  }
},
l3b: {
  title: "Lightning Penetration",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n+7% Lightning Penetration",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    lightningPenetration: 7
  }
},
l3c: {
  title: "Shock Effect",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n12% increased Shock Effect",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    shockEffectPercent: 12
  }
},
l3d: {
  title: "Stun Chance x Skill Level",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n+2% Stun Chance per 1 Skill Level\n17% increased Damage on Stun",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    stunChancePerLevelPercent: 2,
    damageOnStunPercent: 17
  }
},

    l4a: {
  title: "Redistribution",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\nPrevious Node gains +52% to Stats\nNext Node gains -51% to Stats",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    previousNodeGainPercent: 52,
    nextNodeGainPercent: -51
  }
},
    l4b: {
  title: "Physical Damage x Skill Level",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n0.8% increased Physical Damage per 1 Skill Level",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    physicalDamagePerLevelPercent: 0.8
  }
},
    l4c: {
  title: "Skill Node Next Gain",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nNext Node gains +31% to Stats",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    nextNodeGainPercent: 31
  }
},
    l4d: {
  title: "Skill Level",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\n+1 to all Skill Levels",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    skillLevelFlat: 1
  }
},
    l4e: {
  title: "Resource Cost",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n14% decreased Skill Resource Cost",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    skillResourceCostPercent: -14
  }
},

   l5a: {
  title: "Physical Damage x Nearby Enemy",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nGain +3% of Damage as Extra Physical Damage per 1 Nearby Enemy",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    extraPhysicalPerNearbyEnemyPercent: 3
  }
},

l5b: {
  title: "Physical Damage x Shield Defense",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nGain +3% of Damage as Extra Physical Damage per 30 Shield Defense",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    extraPhysicalPerShieldDefensePercent: 3
  }
},

l5c: {
  title: "Critical Hit x Critical Hit Damage against Nearby",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n+10% Critical Hit Chance against Nearby Enemies\n15% increased Critical Hit Damage against Nearby Enemies",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    critChanceNearbyPercent: 10,
    critDamageNearbyPercent: 15
  }
},

l5d: {
  title: "Damage against Full Life",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n14% increased Damage against Enemies on Full Life",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    damageAgainstFullLifePercent: 14
  }
},


  },
},

{
  id: "dash",
  name: "Dash",
  image: "./img/skill/Dash.png",

  categories: ["Spell", "Teleport", "Cooldown"],

  baseStats: {
    costFlat: 25,
    costPercent: 0,
    cooldown: 3.2,
    damageMin: 0,
    damageMax: 0,
    aoeRadius: 0,
    duration: 0,
    damageRate: 0,
    castSpeed: 2,
    range: 8,

    // Extra base properties (from tooltip blue lines)
    maxSkillChargesFlat: 2,
    maxSkillChargesPer10SkillLevelFlat: 1,

    // Defaults (keep keys stable for UI/calcs)
    aetherPenetration: 0,
    critChance: 0,
    dazzleChance: 0,
    dazzleDuration: 0,
    dazzleEffect: 0,
    extraDamagePerLevel: 0,
    incomingPhysToColdDuringCooldown: 0,
    incomingPhysToAetherDuringCooldown: 0,
    previousNodeGainPercent: 0,
    incomingPhysToFireDuringCooldown: 0,
    skillResourceCostPercent: 0,
    aoeRadiusPerDestroyedNodePercent: 0,
    aoeRadiusPer10ResourcePercent: 0,
    aoeRadiusPerNearbyEnemyPercent: 0,
    negateChanceDuringCooldown: 0,
	
	skillResourceCostDuringCooldownPercent: 0,
	doubleStrikeChanceDuringCooldownPercent: 0,
	cooldownPerDestroyedNodePercent: 0,
	
	doubleStrikeChanceDuringCooldownPercent: 0,
	dodgeChanceDuringCooldownPercent: 0,
	critChanceDuringCooldownPercent: 0,
	cooldownPerDestroyedNodePercent: 0,
	
	lightningResistanceDuringCooldownPercent: 0,
	maxLightningResistanceDuringCooldownPercent: 0,
	aoeRadiusDuringCooldownPercent: 0,
	chillNegateChanceDuringCooldownPercent: 0,
  },

  nodes: {
    bottom: {
      title: "Dash",
      desc: "Quickly dash forward towards a target location."
    },

    l1a: {
  title: "Movement Speed during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 2%\nYou gain 11% increased Movement Speed during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 2,
    movementSpeedDuringCooldownPercent: 11
  }
},

l1b: {
  title: "Skill Charge x Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 2%\n+1 to Maximum Skill Charges\n7% decreased Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 2,
    maxSkillChargesFlat: 1,
    cooldownPercent: -7
  }
},

l2a: {
  title: "Resource Cost during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 3%\nYou gain 7% decreased Skill Resource Cost during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 3,
    skillResourceCostDuringCooldownPercent: -7
  }
},

l2b: {
  title: "Double Strike during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain +9% Double Strike Chance during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    doubleStrikeChanceDuringCooldownPercent: 9
  }
},

l2c: {
  title: "Cooldown x Destroyed Node",
  desc: "Cost: Aether 1\nCost Of Base: Aether 3%\n6% decreased Skill Cooldown per 1 Destroyed Node",
  modifiers: {
    costFlat: 1,
    costPercent: 3,
    cooldownPerDestroyedNodePercent: -6
  }
},

l3a: {
  title: "Double Strike during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain +8% Double Strike Chance during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    doubleStrikeChanceDuringCooldownPercent: 8
  }
},

l3b: {
  title: "Dodge during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nYou gain +5% Dodge Chance during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    dodgeChanceDuringCooldownPercent: 5
  }
},

l3c: {
  title: "Critical Hit during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nYou gain +7% Critical Hit Chance during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    critChanceDuringCooldownPercent: 7
  }
},

l3d: {
  title: "Cooldown x Destroyed Node",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n8% decreased Skill Cooldown per 1 Destroyed Node",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    cooldownPerDestroyedNodePercent: -8
  }
},

l4a: {
  title: "Resource Cost",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n19% decreased Skill Resource Cost",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    skillResourceCostPercent: -19
  }
},

l4b: {
  title: "Reallocation",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\nPrevious Node gains -53% to Stats\nNext Node gains +59% to Stats",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    previousNodeGainPercent: -53,
    nextNodeGainPercent: 59
  }
},

l4c: {
  title: "Skill Node Next Gain",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nNext Node gains +31% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    nextNodeGainPercent: 31
  }
},

l4d: {
  title: "Resource Cost Increased",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\n20% increased Skill Resource Cost",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    skillResourceCostPercent: 20
  }
},

l4e: {
  title: "Skill Charge",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n+1 to Maximum Skill Charges",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    maxSkillChargesFlat: 1
  }
},

l5a: {
  title: "Lightning Resistance x Lightning Resistance Max during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain +14% Lightning Resistance during Skill Cooldown\nYou gain +1% to Maximum Lightning Resistance during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    lightningResistanceDuringCooldownPercent: 14,
    maxLightningResistanceDuringCooldownPercent: 1
  }
},

l5b: {
  title: "AoE Radius during Cooldown",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\nYou gain 14% increased AoE Radius during Skill Cooldown",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    aoeRadiusDuringCooldownPercent: 14
  }
},

l5c: {
  title: "Negate during Cooldown",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\nYou gain +7% Chance to Negate during Skill Cooldown",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    negateChanceDuringCooldown: 7
  }
},

l5d: {
  title: "Chill Negate during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\nYou gain +58% Chance to Negate Chills during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    chillNegateChanceDuringCooldownPercent: 58
  }
},
  },
},

{
  id: "bullet_rain",
  name: "Bullet Rain",
  image: "./img/skill/Bullet Rain.png",
    categories: ["Ranged", "AoE", "Cooldown", "Physical"],

  baseStats: {
    costFlat: 25,
    costPercent: 0,

    cooldown: 4,
    duration: 2,
    aoeRadius: 3.7,

    damageMin: 0,
    damageMax: 0,
    damageRate: 1,
    castSpeed: 1,
    range: 15,

    // бонусы из синего текста
    aoeRadiusPercent: 15,
    extraPhysicalDamagePerLevelPercent: 10,
	extraPhysicalDamagePercent: 0,
	extraLightningDamagePerLevelPercent: 0,
	extraColdDamagePerLevelPercent: 0,
	incomingPhysToLightningDuringCooldownPercent: 0,
	aoeRadiusPerSkillChargePercent: 0,
	aoeRadiusPerSkillLevelPercent: 0,
	aoeRadiusPerShieldDefensePercent: 0,
  },

  nodes: {
	  bottom: {
		  title: "Bullet Rain",
		  desc: "Fire a massive volley of bullets that land in a targeted area."
			},
			
	  l1a: {
    title: "Physical Damage x Cooldown",
    desc: "Cost: Aether 1\nCost Of Base: Aether 2%\nAdds 1 to 3 Physical Damage\n8% decreased Skill Cooldown\n7% increased Physical Damage",
    modifiers: {
      costFlat: 1,
      costPercent: 2,
      addedPhysicalMin: 1,
      addedPhysicalMax: 3,
      cooldownPercent: -8,
      physicalDamagePercent: 7
    }
  },

  l1b: {
    title: "Range x Damage",
    desc: "Cost: Aether 1\nCost Of Base: Aether 3%\n9% increased Range\n8% increased Damage",
    modifiers: {
      costFlat: 1,
      costPercent: 3,
      rangePercent: 9,
      damagePercent: 8
    }
  },
  
  l2a: {
  title: "AoE Radius during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain 9% increased AoE Radius during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    aoeRadiusDuringCooldownPercent: 9
  }
},

l2b: {
  title: "Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n10% decreased Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    cooldownPercent: -10
  }
},

l2c: {
  title: "Cooldown x Destroyed Node",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n7% decreased Skill Cooldown per 1 Destroyed Node",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    cooldownPerDestroyedNodePercent: -7
  }
},

l3a: {
  title: "AoE Radius",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n11% increased AoE Radius",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    aoeRadiusPercent: 11
  }
},

l3b: {
  title: "Physical Damage",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\nGain +9% of Damage as Extra Physical Damage",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    extraPhysicalDamagePercent: 9
  }
},

l3c: {
  title: "Lightning Damage x Skill Level",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nGain +2% of Damage as Extra Lightning Damage per 1 Skill Level",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    extraLightningDamagePerLevelPercent: 2
  }
},

l3d: {
  title: "Cold Damage x Skill Level",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nGain +1% of Damage as Extra Cold Damage per 1 Skill Level",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    extraColdDamagePerLevelPercent: 1
  }
},

l4a: {
  title: "Resource Cost",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\n16% decreased Skill Resource Cost",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    skillResourceCostPercent: -16
  }
},

l4b: {
  title: "Incoming Physical to Lightning during Cooldown",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nYou gain +7% of incoming Physical Damage Converted to Lightning Damage during Skill Cooldown",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    incomingPhysToLightningDuringCooldownPercent: 7
  }
},

l4c: {
  title: "Skill Node Next Gain",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nNext Node gains +32% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    nextNodeGainPercent: 32
  }
},

l4d: {
  title: "Redistribution",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nPrevious Node gains +54% to Stats\nNext Node gains -50% to Stats",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    previousNodeGainPercent: 54,
    nextNodeGainPercent: -50
  }
},

l4e: {
  title: "Skill Node Previous x Next Gain",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\nPrevious Node gains +16% to Stats\nNext Node gains +16% to Stats",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    previousNodeGainPercent: 16,
    nextNodeGainPercent: 16
  }
},

l5a: {
  title: "AoE Radius x Skill Charge",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\n9% increased AoE Radius per 1 Skill Charge",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    aoeRadiusPerSkillChargePercent: 9
  }
},

l5b: {
  title: "AoE Radius x Skill Level",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n3% increased AoE Radius per 1 Skill Level",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    aoeRadiusPerSkillLevelPercent: 3
  }
},

l5c: {
  title: "AoE Radius x Shield Defense",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\n4% increased AoE Radius per 30 Shield Defense",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    aoeRadiusPerShieldDefensePercent: 4
  }
},

l5d: {
  title: "AoE Radius during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\nYou gain 17% increased AoE Radius during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    aoeRadiusDuringCooldownPercent: 17
  }
},
			
			
  },
},

{
  id: "flash_bang",
  name: "Flash Bang",
  image: "./img/skill/Flash Bang.png",
  categories: ["Spell", "AoE", "Cooldown", "Aether"],

  baseStats: {
    costFlat: 25,
    costPercent: 0,

    cooldown: 10,

    damageMin: 6,
    damageMax: 10,

    aoeRadius: 5.7,
    duration: 0,
    damageRate: 1,

    boostDuration: 4,
    impairmentDuration: 4,

    castSpeed: 5,
    range: 500,

    knockbackChancePercent: 50,
    dazzleChance: 42,

    extraAetherDamagePerLevelPercent: 25,
	addedAetherMin: 0,
	addedAetherMax: 0,
	extraAetherDamagePercent: 0,
	crushingHitEffectPercent: 0,
	outgoingPhysToColdDuringCooldownPercent: 0,
	critDamagePerDexterityPercent: 0,
	critDamagePerResourceConsumedPercent: 0,
	damageAgainstFrozenPercent: 0,
  },

  nodes: {
	  
	bottom: {
		  title: "Flash Bang",
		  desc: "Throw dazzling flash grenades in all directions."
			},
			
	l1a: {
  title: "Dazzle x Duration x Effect",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n11% increased Dazzle Chance\n6% increased Dazzle Duration\n5% increased Dazzle Effect",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    dazzleChance: 11,
    dazzleDuration: 6,
    dazzleEffect: 5
  }
},

l1b: {
  title: "Aether Damage",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nAdds 1 to 3 Aether Damage\nGain +9% of Damage as Extra Aether Damage",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    addedAetherMin: 1,
    addedAetherMax: 3,
    extraAetherDamagePercent: 9
  }
},

l2a: {
  title: "Dodge during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain +5% Dodge Chance during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    dodgeChanceDuringCooldownPercent: 5
  }
},

l2b: {
  title: "Resource Cost during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 3%\nYou gain 6% decreased Skill Resource Cost during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 3,
    skillResourceCostDuringCooldownPercent: -6
  }
},

l2c: {
  title: "Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n20% decreased Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    cooldownPercent: -20
  }
},

l3a: {
  title: "AoE Radius during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain 9% increased AoE Radius during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    aoeRadiusDuringCooldownPercent: 9
  }
},

l3b: {
  title: "Crushing Hit Effect",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n11% increased Crushing Hit Effect",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    crushingHitEffectPercent: 11
  }
},

l3c: {
  title: "Critical Hit during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain +7% Critical Hit Chance during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    critChanceDuringCooldownPercent: 7
  }
},

l3d: {
  title: "Physical to Cold during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nYou gain +30% of outgoing Physical Damage Converted to Cold Damage during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    outgoingPhysToColdDuringCooldownPercent: 30
  }
},

l4a: {
  title: "Skill Level",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\n+2 to all Skill Levels",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    skillLevelFlat: 2
  }
},

l4b: {
  title: "Skill Node Next Gain",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nNext Node gains +31% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    nextNodeGainPercent: 31
  }
},

l4c: {
  title: "Skill Node Previous Gain",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nPrevious Node gains +38% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    previousNodeGainPercent: 38
  }
},

l4d: {
  title: "Incoming Physical to Fire during Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nYou gain +6% of incoming Physical Damage Converted to Fire Damage during Skill Cooldown",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    incomingPhysToFireDuringCooldown: 6
  }
},

l4e: {
  title: "Redistribution",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nPrevious Node gains +59% to Stats\nNext Node gains -58% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    previousNodeGainPercent: 59,
    nextNodeGainPercent: -58
  }
},

l5a: {
  title: "Dodge during Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nYou gain +5% Dodge Chance during Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    dodgeChanceDuringCooldownPercent: 5
  }
},

l5b: {
  title: "Critical Hit Damage x Dexterity",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\n5% increased Critical Hit Damage per 20 Dexterity",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    critDamagePerDexterityPercent: 5
  }
},

l5c: {
  title: "Critical Hit Damage x Resource Consumed",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n3% increased Critical Hit Damage per 10 Resource Consumed by Skill",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    critDamagePerResourceConsumedPercent: 3
  }
},

l5d: {
  title: "Damage against Frozen",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n16% increased Damage against Frozen Enemies",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    damageAgainstFrozenPercent: 16
  }
},


  },
},

{
  id: "rapid_shot",
  name: "Rapid Shot",
  image: "./img/skill/Rapid Shot.png",
  categories: ["Ranged", "Projectile", "Cooldown", "Physical"],

  baseStats: {
    costFlat: 25,
    costPercent: 0,

    cooldown: 4,

    projectileSpeed: 25,

    damageMin: 0,
    damageMax: 0,
    damageRate: 1,

    castSpeed: 1,
    range: 15,

    critChance: 3,

    maxSkillChargesFlat: 2,

    extraPhysicalDamagePerLevelPercent: 10,
	projectileSpeedPercent: 0,
	endingHitEffectPercent: 0,
	bleedDurationPercent: 0,
	extraLightningDamageAgainstShockedPercent: 0,
	projectileChainChanceAgainstShockedPercent: 0,
	projectileChainChancePercent: 0,
	critDamagePercent: 0,
	aetherOnKillFlat: 0,
	lightningDamageAgainstChilledPercent: 0,
	endingHitEffectPerResourceConsumedPercent: 0,
  },

  nodes: {
	  
	  bottom: {
		  title: "Rapid Shot",
		  desc: "Fire multiple shots in rapid succession with your ranged weapon."
			},
			
	l1a: {
  title: "Speed",
  desc: "Cost: Aether 1\nCost Of Base: Aether 2%\n18% increased Projectile Speed",
  modifiers: {
    costFlat: 1,
    costPercent: 2,
    projectileSpeedPercent: 18
  }
},

l1b: {
  title: "Physical Damage x Cooldown",
  desc: "Cost: Aether 1\nCost Of Base: Aether 3%\nAdds 1 to 3 Physical Damage\n7% decreased Skill Cooldown\n7% increased Physical Damage",
  modifiers: {
    costFlat: 1,
    costPercent: 3,
    addedPhysicalMin: 1,
    addedPhysicalMax: 3,
    cooldownPercent: -7,
    physicalDamagePercent: 7
  }
},

l2a: {
  title: "Range",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n9% increased Range",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    rangePercent: 9
  }
},

l2b: {
  title: "Ending Hit Effect",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n15% increased Ending Hit Effect",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    endingHitEffectPercent: 15
  }
},

l2c: {
  title: "Bleed Duration",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n13% increased Bleed Duration",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    bleedDurationPercent: 13
  }
},

l3a: {
  title: "Critical Hit",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n+5% Critical Hit Chance",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    critChance: 5
  }
},

l3b: {
  title: "Lightning Damage x Chain against Shocked",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nGain +10% of Damage as Extra Lightning Damage against Shocked Enemies\n+17% Projectile Chain Chance against Shocked Enemies",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    extraLightningDamageAgainstShockedPercent: 10,
    projectileChainChanceAgainstShockedPercent: 17
  }
},

l3c: {
  title: "Cooldown",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n19% decreased Skill Cooldown",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    cooldownPercent: -19
  }
},

l3d: {
  title: "Chain",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n+33% Projectile Chain Chance",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    projectileChainChancePercent: 33
  }
},

l4a: {
  title: "Skill Level",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n+2 to all Skill Levels",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    skillLevelFlat: 2
  }
},

l4b: {
  title: "Resource Cost",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n19% decreased Skill Resource Cost",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    skillResourceCostPercent: -19
  }
},

l4c: {
  title: "Critical Hit Damage",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\n12% increased Critical Hit Damage",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    critDamagePercent: 12
  }
},

l4d: {
  title: "Physical Damage x Skill Level",
  desc: "Cost: Aether 2\nCost Of Base: Aether 8%\nGain +3% of Damage as Extra Physical Damage per 1 Skill Level",
  modifiers: {
    costFlat: 2,
    costPercent: 8,
    extraPhysicalDamagePerLevelPercent: 3
  }
},

l4e: {
  title: "Redistribution",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nPrevious Node gains +58% to Stats\nNext Node gains -57% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    previousNodeGainPercent: 58,
    nextNodeGainPercent: -57
  }
},

l5a: {
  title: "Gain Aether on Kill",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\nGain +6 Aether on Kill",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    aetherOnKillFlat: 6
  }
},

l5b: {
  title: "Lightning Damage against Chilled",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n20% increased Lightning Damage against Chilled Enemies",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    lightningDamageAgainstChilledPercent: 20
  }
},

l5c: {
  title: "Ending Hit Effect x Resource Consumed",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\n12% increased Ending Hit Effect per 10 Resource Consumed by Skill",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    endingHitEffectPerResourceConsumedPercent: 12
  }
},

l5d: {
  title: "Resource Cost during Cooldown",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\nYou gain 15% decreased Skill Resource Cost during Skill Cooldown",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    skillResourceCostDuringCooldownPercent: -15
  }
},

	
  },
},

{
  id: "sweep",
  name: "Sweep",
  image: "./img/skill/Sweep.png",
  categories: ["AoE", "Melee", "Physical"],

  baseStats: {
    costFlat: 25,
    costPercent: 0,

    cooldown: 0,

    aoeRadius: 3,
    damageRate: 1,
    range: 15,

    damageMin: 0,
    damageMax: 0,

    knockbackChancePercent: 100,

    extraPhysicalDamagePerLevelPercent: 9,
	knockbackDistancePercent: 0,
	bleedChancePercent: 0,
	bleedDurationPercent: 0,
	bleedDamagePercent: 0,
	extraPhysicalDamagePercent: 0,
	stunChancePerLevelPercent: 0,
	damageOnStunPercent: 0,
	endingHitChancePercent: 0,
	extraFireDamagePerLevelPercent: 0,
	attackSpeedPercent: 0,
  },

  nodes: {
	  
	  bottom: {
		  title: "Sweep",
		  desc: "Perform a circular attack, knocking back and damaging enemies around you."
			},
			
	l1a: {
  title: "Knockback x Distance",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n+7% Knockback Chance\n17% increased Knockback Distance",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    knockbackChancePercent: 7,
    knockbackDistancePercent: 17
  }
},

l1b: {
  title: "Bleed x Duration x Damage",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n+10% Bleed Chance\n10% increased Bleed Duration\n7% increased Bleed Damage",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    bleedChancePercent: 10,
    bleedDurationPercent: 10,
    bleedDamagePercent: 7
  }
},

l2a: {
  title: "Physical Damage",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\nGain +7% of Damage as Extra Physical Damage",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    extraPhysicalDamagePercent: 7
  }
},

l2b: {
  title: "Stun Chance x Skill Level",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n+2% Stun Chance per 1 Skill Level\n17% increased Damage on Stun",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    stunChancePerLevelPercent: 2,
    damageOnStunPercent: 17
  }
},

l2c: {
  title: "Ending Hit",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n+12% Ending Hit Chance",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    endingHitChancePercent: 12
  }
},

l3a: {
  title: "Fire Damage x Skill Level",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\nGain +2% of Damage as Extra Fire Damage per 1 Skill Level",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    extraFireDamagePerLevelPercent: 2
  }
},

l3b: {
  title: "Bleed Damage",
  desc: "Cost: Aether 1\nCost Of Base: Aether 4%\n6% increased Bleed Damage",
  modifiers: {
    costFlat: 1,
    costPercent: 4,
    bleedDamagePercent: 6
  }
},

l3c: {
  title: "Ending Hit",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n+13% Ending Hit Chance",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    endingHitChancePercent: 13
  }
},

l3d: {
  title: "Attack Speed",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n11% increased Attack Speed",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    attackSpeedPercent: 11
  }
},

l4a: {
  title: "Skill Level",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n+2 to all Skill Levels",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    skillLevelFlat: 2
  }
},

l4b: {
  title: "Skill Node Previous x Next Gain",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nPrevious Node gains +18% to Stats\nNext Node gains +17% to Stats",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    previousNodeGainPercent: 18,
    nextNodeGainPercent: 17
  }
},

l4c: {
  title: "Physical Damage x Skill Level",
  desc: "Cost: Aether 3\nCost Of Base: Aether 10%\nGain +2% of Damage as Extra Physical Damage per 1 Skill Level",
  modifiers: {
    costFlat: 3,
    costPercent: 10,
    extraPhysicalDamagePerLevelPercent: 2
  }
},
	l4d: {
  title: "Redistribution",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\nPrevious Node gains +60% to Stats\nNext Node gains -50% to Stats",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
	  previousNodeGainPercent: 60,
	  nextNodeGainPercent: -50
  }
},

l4e: {
  title: "Resource Cost Increased",
  desc: "Cost: Aether 1\nCost Of Base: Aether 5%\n17% increased Skill Resource Cost",
  modifiers: {
    costFlat: 1,
    costPercent: 5,
    skillResourceCostIncreasePercent: 17
  }
},

l5a: {
  title: "Damage against Injured x Resource Consumed",
  desc: "Cost: Aether 2\nCost Of Base: Aether 6%\n4% increased Damage per 5 Resource Consumed by Skill against Injured Enemies",
  modifiers: {
    costFlat: 2,
    costPercent: 6,
    damagePer5ResourceVsInjuredPercent: 4
  }
},

l5b: {
  title: "Crushing Hit Effect x Nearby Enemy",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n6% increased Crushing Hit Effect per 1 Nearby Enemy",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    crushingHitEffectPerNearbyEnemyPercent: 6
  }
},

l5c: {
  title: "Physical Damage on Knockback",
  desc: "Cost: Aether 3\nCost Of Base: Aether 12%\n21% increased Physical Damage on Knockback",
  modifiers: {
    costFlat: 3,
    costPercent: 12,
    physicalDamageOnKnockbackPercent: 21
  }
},

l5d: {
  title: "Crushing Hit Effect x Strength",
  desc: "Cost: Aether 2\nCost Of Base: Aether 9%\n5% increased Crushing Hit Effect per 20 Strength",
  modifiers: {
    costFlat: 2,
    costPercent: 9,
    crushingHitEffectPer20StrengthPercent: 5
  }
},

	  
  },
},




  ];

  window.SKILL_DB = Object.freeze({ skills });
})();
