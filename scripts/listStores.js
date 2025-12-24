const fs = require("fs");
const path = require("path");

const rawFile = path.join(__dirname, "../data/raw/latest-canonical.json");

const data = JSON.parse(fs.readFileSync(rawFile, "utf-8"));

const stores = [...new Set(data.map(item => item.store))].sort();

console.log("Available stores:");
stores.forEach(store => console.log("- " + store));