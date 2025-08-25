// generate-db.js
const fs = require("fs");

const locations = ["Konoha", "Suna", "Kiri", "Iwa", "Kumo"];
const healthStates = ["Healthy", "Injured", "Critical"];

function randomId() {
  return Math.random().toString(36).substring(2, 10);
}

function randomName() {
  const syllables = [
    "na","ru","to","sa","su","ke","i","ta","shi","ka","ma","ra","mi","ko","ya","ga","hi",
    "no","re","yu","ki","ro","ta","ne","mo","ha","ri","zen","do","ka","ji","rin","aya","kyo",
    "mei","rin","sho","tai","ken","sei","yuu","sora","aki","mori","nobu","tora"
  ];
  let parts = [];
  let n = 2 + Math.floor(Math.random() * 3); // 2–4 syllables
  for (let i = 0; i < n; i++) {
    parts.push(syllables[Math.floor(Math.random() * syllables.length)]);
  }
  return parts.join("").replace(/^\w/, c => c.toUpperCase());
}

// helper to generate power based on health
function generatePower(health) {
  if (health === "Healthy") {
    // mostly higher range (7000–10000)
    return Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000;
  } else if (health === "Injured") {
    // mid range (3000–7000)
    return Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
  } else {
    // Critical: low range (100–3000)
    return Math.floor(Math.random() * (3000 - 100 + 1)) + 100;
  }
}

const characters = [];
for (let i = 0; i < 1200; i++) {
  const health = healthStates[Math.floor(Math.random() * healthStates.length)];
  const power = generatePower(health); // ensure health is passed here

  characters.push({
    id: randomId(),
    name: randomName(),
    location: locations[Math.floor(Math.random() * locations.length)],
    health,
    power,
  });
}

fs.writeFileSync("db.json", JSON.stringify({ characters }, null, 2));
console.log("✅ db.json generated with", characters.length, "entries");
