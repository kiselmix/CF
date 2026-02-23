window.quest = [
  {
    id: "A-New-Path",
    name: "A New Path",
    tags: ["Act 1"],
    description:
      "Finally light, and freedom! Now where is the civilization in this forsaken place, if there is any.. First clue might be the rat standing over there with seemingly civil manners, he might know something..",
    flavor: `
	Reward:
	<a href="https://crystalfall.fun/skill.html?id=Warp">Warp</a> /
	<a href="https://crystalfall.fun/skill.html?id=Sweep">Sweep</a> /
	<a href="https://crystalfall.fun/skill.html?id=Aether-Rain">Aether Rain</a>
	`,
steps: [
      {
        title: "Step 1 — Talk to the escaped-prisoner",
        images: [
          "img/quest/Act-1/A-New-Path/1.png"
        ]
      },
      {
        title: "Step 2 — Find the encampment",
        text: "Complete the Dumping Grounds location. Go to Castaway's Landing.",
        images: [
          "img/quest/Act-1/A-New-Path/2.png"
        ]
      },
      {
        title: "Step 3 — Talk to Rico",
        images: [
          "img/quest/Act-1/A-New-Path/3.png"
        ]
      }
    ]
  },

  {
    id: "The-Breach-Engine",
    name: "The Breach Engine",
    tags: ["Act 1"],
    description:
      "Want to leave Prison Island? If you help free my client from Shadowgate Prison, you'll have a place on my ship. To break in, you'll need my Breach Engine, which has been stolen by raiders. I tracked them to Putrid Lake, but I dare not enter the Rat Burrow.",
     flavor:
      "Reward: 1 Talent Point; Spell Crest",
	steps: [
      {
        title: "Step 1 — Go to Putrid Lake",
        text: "We go to the Blackwater Creek location and go to Putrid Lake.",
        images: ["img/quest/Act-1/The-Breach-Engine/1.png"]
      },
      {
        title: "Step 2 — Find Rat Burrow in Putrid Lake",
        text: "In the Putrid Lake location, look for a cave with a Rat Burrow. Enter Rat Burrow-Cave.",
        images: ["img/quest/Act-1/The-Breach-Engine/2.png"]
      },
      {
        title: "Step 3 — Defeat the Raglord",
        text: "Defeat Raglord and pick up Breach Claw",
        images: ["img/quest/Act-1/The-Breach-Engine/3.png"]
      },
      {
        title: "Step 4 — Speak to Shipmaster in encampment",
        text: "Return through the portal to Castaway's Landing and talk to the Shipmaster.",
        images: ["img/quest/Act-1/The-Breach-Engine/4.png"]
      }
    ]
  },

  {
    id: "The-Breach-Engine-Reforged",
    name: "The Breach Engine Reforged",
    tags: ["Act 1"],
    description:
      "I've caught a transmission from the Rock Shelter in the Cliffs. You'll find the Breach Jack there. There should be a Tinkerbox somewhere in the Rugged Plains.",
     flavor:
      "Reward: 1 Talent Point; 5 skill key",
	steps: [
      {
        title: "Step 1 — Find Breach Jack in The Cliffs",
        text: "Enter the Rock Shelter dungeon. You'll find a Breach Jack in the chest.",
        images: ["img/quest/Act-1/The-Breach-Engine-Reforged/1.png"],
      },
      {
        title: "Step 2 — Find Tinkerbox in Rugged Plains",
        text: "Find the bot and kill it. It will drop a Tinkerbox.",
        images: ["img/quest/Act-1/The-Breach-Engine-Reforged/2.png"],
      },
      {
        title: "Step 3 — Activate Tinkerbox",
        text: "Use Tinkerbox, activate it with right mouse button. Drag Breach Claw and Breach Jack into the window that opens.",
        images: ["img/quest/Act-1/The-Breach-Engine-Reforged/3.png"]
      },
      {
        title: "Step 4 — Fuse Breach Claw and Breach Jack",
        text: "",
        images: ["img/quest/Act-1/The-Breach-Engine-Reforged/4.png"]
      },
	  {
        title: "Step 5 — Talk to The Shipmaster in Castaway's Landing",
        text: "",
        images: ["img/quest/Act-1/The-Breach-Engine-Reforged/5.png"]
      }
    ]
  },

  {
    id: "Caught-in-a-Web",
    name: "Caught in a Web",
    tags: ["Act 1"],
    description:
      "A monstrous spider haunts the mountains, trapping the unwary in its web. End the creature before it claims more lives.",
    flavor:
      "Reward: 1 Talent Point",
	steps: [
      {
        title: "Step 1 — Go to Weaver's Nest",
        text: "Weaver's Nest is located in The Veiled Passage.",
        images: ["img/quest/Act-1/Caught-in-a-Web/1.png"]
      },
      {
        title: "Step 2 — Kill the Weaver",
        text: "Inside the dungeon, look for a huge spider and kill it.",
        images: ["img/quest/Act-1/Caught-in-a-Web/2.png"]
      },
      {
        title: "Step 3 — Talk to Escaped Prisoner in Castaway's Landing",
        text: "",
        images: ["img/quest/Act-1/Caught-in-a-Web/3.png"]
      }
    ]
  },

  {
    id: "Free-Alden",
    name: "Free Alden",
    tags: ["Act 1"],
    description:
      "Time to free my client from Shadowgate Prison. Look for the entrance in the Outer Court beyond the Rugged Plains. Good luck.",
	flavor: `
	Reward:
	<a href="https://crystalfall.fun/skill.html?id=Lightning-Quake">Lightning Quake</a> /
	<a href="https://crystalfall.fun/skill.html?id=Aether-Walk">Aether Walk</a> /
	<a href="https://crystalfall.fun/skill.html?id=Ice-Shards">Ice Shards</a>
	`,
	steps: [
      {
        title: "Step 1 — Enter Shadowgate Prison",
        text: "The entrance to the prison is located in the Outer Court dungeon.",
        images: ["img/quest/Act-1/Free-Alden/1.png"]
      },
      {
        title: "Step 2 — Disable the security system",
        text: "Destroy the security bot.",
        images: ["img/quest/Act-1/Free-Alden/2.png"]
      },
      {
        title: "Step 3 — Complete The Prison Intake dungeon",
        text: "Go to Experimentation Ward dungeon.",
        images: ["img/quest/Act-1/Free-Alden/3.png"]
      },
      {
        title: "Step 4 — Complete Experimentation Ward dungeon",
        text: "Go to Torture Chamber dungeon.",
        images: ["img/quest/Act-1/Free-Alden/4.png"]
      },
	  {
        title: "Step 5 — Free the client from his tormentor",
        text: "Complete the dungeon and fight the boss.",
        images: ["img/quest/Act-1/Free-Alden/5.png"]
      },
	   {
        title: "Step 6 — Talk to Alden, Then-return-to-encampment.",
        text: "",
        images: ["img/quest/Act-1/Free-Alden/6.png"]
      },
	   {
        title: "Step 7 — Talk to Alden Sage in Castaway's Landing",
        text: "",
        images: ["img/quest/Act-1/Free-Alden/7.png"]
      }
    ]
  }
];
