const fs = require("fs");
const path = require("path");
const https = require("https");

// Paths
const rawFile = path.join(__dirname, "../data/raw/latest-canonical.json");
const outputFile = path.join(__dirname, "../data/processed/filtered_dairy_products.json");

// Stores and dairy keywords
const allowedStores = ["billa", "spar", "hofer"];
const dairyKeywords = ["milk", "cheese", "yogurt", "butter", "cream"];

// Function to download JSON file
function downloadJSON(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close(callback);
    });
  }).on("error", (err) => {
    fs.unlink(dest, () => {}); // Delete partially downloaded file
    console.error("Download error:", err.message);
    callback(err);
  });
}

// Function to filter dairy products
function filterDairy(data) {
  const filtered = data.filter(item => {
    const storeOk = allowedStores.includes(item.store.toLowerCase());
    const isDairy = dairyKeywords.some(keyword =>
      item.name.toLowerCase().includes(keyword)
    );
    return storeOk && isDairy;
  });

  fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2));
  console.log(`Filtered ${filtered.length} dairy products saved to ${outputFile}`);
}

// Main automation
function runAutomation() {
  console.log("Starting automation...");

  downloadJSON("https://heisse-preise.io/data/latest-canonical.json", rawFile, (err) => {
    if (err) return;
    console.log(`Downloaded raw data to ${rawFile}`);
    const data = JSON.parse(fs.readFileSync(rawFile, "utf-8"));
    filterDairy(data);
  });
}

runAutomation();
