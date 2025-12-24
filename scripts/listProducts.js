const fs = require("fs");
const path = require("path");

const filteredFile = path.join(__dirname, "../data/processed/filtered_dairy_products.json");
const outputFile = path.join(__dirname, "../data/processed/product_names.txt");

const data = JSON.parse(fs.readFileSync(filteredFile, "utf-8"));
const names = data.map(item => item.name);

fs.writeFileSync(outputFile, names.join("\n"));
console.log(`Saved ${names.length} product names to ${outputFile}`);
