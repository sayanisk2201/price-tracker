const fs = require("fs");
const path = require("path");

fs.mkdirSync(path.join(__dirname, "../data/raw"), { recursive: true });
fs.mkdirSync(path.join(__dirname, "../data/processed"), { recursive: true });


// Import steps
require("./fetchAndFilterGroceries");      // creates filtered_groceries_vienna.json
const matchShoppingList = require("./matchShoppingList");

// Output file
const outputPath = path.join(
  __dirname,
  "../data/processed/weekly_plan.txt"
);

console.log("Starting automation...");

// Run matching logic (this MUST return results)
const { cheapestItems, totalsPerStore } = matchShoppingList();

// Build human-readable summary
let summaryText = "🛒 Shopping plan for this week:\n\n";

cheapestItems.forEach(item => {
  const line = `- Buy ${item.product} at ${item.store} (€${item.price})`;
  console.log(line);
  summaryText += line + "\n";
});

summaryText += "\n💰 Total cost per store:\n";

for (const store in totalsPerStore) {
  const line = `- ${store}: €${totalsPerStore[store].toFixed(2)}`;
  console.log(line);
  summaryText += line + "\n";
}

// Save to file
fs.writeFileSync(outputPath, summaryText, "utf-8");

console.log("\nAutomation completed.");
console.log(`Weekly plan saved to: ${outputPath}`);
