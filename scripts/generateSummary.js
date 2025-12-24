const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "../data/processed/cheapest_plan.json");
const OUTPUT_FILE = path.join(__dirname, "../data/processed/shopping_summary.txt");

const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));
const { results, totals } = data;

let lines = [];
lines.push("🛒 Shopping plan for this week:\n");

for (const item of results) {
  lines.push(`- Buy ${item.product} at ${item.store} (€${item.price.toFixed(2)})`);
}

lines.push("\n💰 Total cost per store:");
for (const store of Object.keys(totals)) {
  lines.push(`- ${store}: €${totals[store].toFixed(2)}`);
}

const output = lines.join("\n");
fs.writeFileSync(OUTPUT_FILE, output);

console.log(output);