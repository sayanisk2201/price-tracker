/**
 * runAll.js
 * Master automation entry point
 * Runs the full weekly pipeline
 */

console.log("Starting automation...");

require("./fetchAndFilterGroceries");
require("./matchShoppingList");
require("./generateSummary");

console.log("Automation completed.");
