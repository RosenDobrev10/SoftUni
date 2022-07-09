function lowestPricesInCities(array) {

  let object = {};

  for (let line of array) {
    let [town, product, price] = line.split(" | ");
    price = Number(price);
    if (!object.hasOwnProperty(product)) {
      object[product] = { price, town };
    } else {
      if (object[product].price > price) {
        object[product] = { price, town };
      }
    }
  }

  for (let [product, info] of Object.entries(object)) {
    console.log(`${product} -> ${info.price} (${info.town})`);
  }
  
}
lowestPricesInCities([
  "Sample Town | Sample Product | 1000",
  "Sample Town | Orange | 2",
  "Sample Town | Peach | 1",
  "Sofia | Orange | 3",
  "Sofia | Peach | 2",
  "New York | Sample Product | 1000.1",
  "New York | Burger | 10",
]);
