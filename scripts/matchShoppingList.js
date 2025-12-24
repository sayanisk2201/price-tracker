const fs = require("fs");
const path = require("path");

// Paths
const PRODUCTS_FILE = path.join(__dirname, "../data/processed/filtered_dairy_products.json");
const SHOPPING_LIST_FILE = path.join(__dirname, "../data/processed/shopping_list.json");
const OUTPUT_FILE = path.join(__dirname, "../data/processed/cheapest_plan.json");

// Load data
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8"));
const shoppingList = JSON.parse(fs.readFileSync(SHOPPING_LIST_FILE, "utf-8"));

// Stores we care about
const STORES = ["billa", "spar", "hofer"];

const results = [];
const totals = { billa: 0, spar: 0, hofer: 0 };

for (const item of shoppingList) {
  const keyword = item.toLowerCase();

  // Find matching products
  const matches = products.filter(p =>
    STORES.includes(p.store) &&
    p.name.toLowerCase().includes(keyword)
  );

  if (matches.length === 0) continue;

  // Find cheapest match
  const cheapest = matches.reduce((min, p) =>
    p.price < min.price ? p : min
  );

  results.push({
    product: item,
    store: cheapest.store,
    price: cheapest.price,
    name: cheapest.name
  });

  totals[cheapest.store] += cheapest.price;
}

// Save output
fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify({ results, totals }, null, 2)
);

console.log("Cheapest shopping plan created:");
console.log(results);
console.log("Total per store:", totals);
