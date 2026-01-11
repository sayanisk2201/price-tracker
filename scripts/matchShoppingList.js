const fs = require("fs");
const path = require("path");

// Paths
const groceriesPath = path.join(
  __dirname,
  "../data/processed/filtered_groceries_vienna.json"
);
const shoppingListPath = path.join(
  __dirname,
  "../data/processed/shopping_list.json"
);

// Load data
const groceries = JSON.parse(fs.readFileSync(groceriesPath, "utf-8"));
const shoppingList = JSON.parse(fs.readFileSync(shoppingListPath, "utf-8"));

function matchShoppingList() {
  const cheapestMap = {};
  const totalsPerStore = {};

  shoppingList.forEach(item => {
    const matches = groceries.filter(g =>
      g.name.toLowerCase().includes(item.toLowerCase())
    );

    if (matches.length === 0) return;

    const cheapest = matches.reduce((a, b) =>
      a.price < b.price ? a : b
    );

    cheapestMap[item] = {
      product: item,
      store: cheapest.store,
      price: cheapest.price,
      matchedName: cheapest.name
    };

    totalsPerStore[cheapest.store] =
      (totalsPerStore[cheapest.store] || 0) + cheapest.price;
  });

  return {
    cheapestItems: Object.values(cheapestMap),
    totalsPerStore
  };
}

// 👇 this is the KEY LINE
module.exports = function () {
  return {
    cheapestItems,
    totalsPerStore
  };
};
