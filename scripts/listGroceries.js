const fs = require("fs");
const path = require("path");

const rawFile = path.join(__dirname, "../data/raw/latest-canonical.json");
const outputFile = path.join(__dirname, "../data/processed/grocery_products.txt");

const stores = ["billa", "spar", "hofer"];

const groceryKeywords = [
  "milk", "milch", "yoghurt", "joghurt", "yogurt",
  "butter", "käse", "cheese", "cream", "rahm",
  "brot", "bread", "vollkorn", "semmel", "baguette",
  "apple", "apfel", "banana", "banane",
  "tomate", "tomaten", "ingwer", "ginger",
  "kartoffel"
];

const data = JSON.parse(fs.readFileSync(rawFile, "utf-8"));

const groceries = data.filter(item => {
  const storeOk = stores.includes(item.store);
  const name = item.name.toLowerCase();
  const keywordOk = groceryKeywords.some(k => name.includes(k));
  return storeOk && keywordOk;
});

// Make output readable
const lines = groceries.map(p =>
  `[${p.store}] €${p.price} — ${p.name}`
);

fs.writeFileSync(outputFile, lines.join("\n"));
console.log(`Saved ${lines.length} grocery products to ${outputFile}`);