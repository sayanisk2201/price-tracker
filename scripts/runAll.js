console.log("Starting automation...");

require("./fetchAndFilterGroceries");

const runMatching = require("./runAutomation");

runMatching();

console.log("Automation completed.");
