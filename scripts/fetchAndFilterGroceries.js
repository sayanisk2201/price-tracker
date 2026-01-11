
const fs = require("fs");
const path = require("path");

// Paths
const dataDir = path.join(__dirname, "../data");
const rawDir = path.join(dataDir, "raw");
const processedDir = path.join(dataDir, "processed");

const rawFile = path.join(rawDir, "latest-canonical.json");
const outputFile = path.join(
  processedDir,
  "filtered_groceries_vienna.json"
);

// Ensure folders exist (CRITICAL for GitHub Actions)
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(processedDir, { recursive: true });

// Allowed stores
const allowedStores = ["billa", "spar", "hofer"];

// Download JSON if needed
async function downloadJSON() {
  console.log("Downloading JSON from Heisse Preise...");
  const res = await fetch("https://heisse-preise.io/data/latest-canonical.json");
  const data = await res.json();
  fs.writeFileSync(rawFile, JSON.stringify(data));
  console.log("Raw data saved");
  return data;
}

// Filter logic
function filterGroceries(data) {
  const filtered = data.filter(item => {
    return allowedStores.includes(item.store?.toLowerCase());
  });

  fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2));
  console.log(
    `Saved ${filtered.length} grocery items to filtered_groceries_vienna.json`
  );
}

// Main
(async () => {
  let data;

  if (fs.existsSync(rawFile)) {
    data = JSON.parse(fs.readFileSync(rawFile, "utf-8"));
  } else {
    data = await downloadJSON();
  }

  filterGroceries(data);
})();
