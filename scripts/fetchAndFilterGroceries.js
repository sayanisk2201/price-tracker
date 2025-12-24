const fs = require("fs");
const path = require("path");

// Paths
const rawFile = path.join(__dirname, "../data/raw/latest-canonical.json");
const outputFile = path.join(__dirname, "../data/processed/filtered_grocery_products.json");

// Stores we care about
const allowedStores = ["billa", "spar", "hofer"];

// Broad grocery keywords (EN + DE)
const groceryKeywords = [
  "milch", "milk", "joghurt", "yogurt", "käse", "cheese", "butter", "rahm",
  "brot", "vollkorn", "toast",
  "apfel", "apple", "banane", "banana",
  "ingwer", "ginger",
  "ei", "egg",
  "reis", "rice",
  "nudel", "pasta"
];

async function downloadJSON() {
  console.log("Downloading JSON from Heisse Preise...");
  const res = await fetch("https://heisse-preise.io/data/latest-canonical.json");
  const data = await res.json();
  fs.writeFileSync(rawFile, JSON.stringify(data, null, 2));
  console.log(`Saved raw data to ${rawFile}`);
  return data;
}

function filterGroceries(data) {
  const filtered = data.filter(item => {
    const storeOk = allowedStores.includes(item.store.toLowerCase());
    const isGrocery = groceryKeywords.some(keyword =>
      item.name.toLowerCase().includes(keyword)
    );
    return storeOk && isGrocery;
  });

  fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2));
  console.log(`Filtered ${filtered.length} grocery products saved to ${outputFile}`);
}

(async () => {
  let data;
  if (fs.existsSync(rawFile)) {
    console.log("Raw JSON already exists, loading from disk...");
    data = JSON.parse(fs.readFileSync(rawFile, "utf-8"));
  } else {
    data = await downloadJSON();
  }

  filterGroceries(data);
})();