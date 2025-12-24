console.log("Starting weekly price automation...\n");

require("./fetchAndFilterGroceries");
require("./matchShoppingList");
require("./generateSummary");

console.log("\nAutomation completed successfully.");