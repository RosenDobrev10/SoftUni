function touristShop(input) {
  let index = 0;
  let budget = Number(input[index++]);
  let command = input[index++];
  let counterProduct = 0;
  let price = 0;

  while (command !== "Stop") {
    counterProduct++;
    priceProduct = Number(input[index++]);
    if (counterProduct % 3 === 0) {
      priceProduct *= 0.5;
    }
    if (priceProduct > budget) {
      break;
    }
    budget -= priceProduct;
    price += priceProduct;
    command = input[index++];
  }
  if (priceProduct > budget) {
    console.log("You don't have enough money!");
    console.log(`You need ${Math.abs(priceProduct - budget).toFixed(2)} leva!`);
  } else {
    console.log(`You bought ${counterProduct} products for ${price.toFixed(2)} leva.`);
  }
}
touristShop(["54", "Thermal underwear", "24", "Sunscreen", "45"]);
