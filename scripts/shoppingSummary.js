const fs = require("fs");
const path = require("path");

const planFile = path.join(__dirname, "../data/processed/shopping_plan.json");
const plan = JSON.parse(fs.readFileSync(planFile, "utf-8"));

console.log("🛒 Shopping plan for this week:");
plan.forEach(item => {
  if(item.store && item.price !== null){
    console.log(`- Buy ${item.product} at ${item.store} (€${item.price.toFixed(2)})`);
  } else {
    console.log(`- ${item.product} not found in dataset`);
  }
});
