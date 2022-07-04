function fruit(fruit, weight, priceForKilo) {

    let money = (weight / 1000) * priceForKilo;
    console.log(`I need $${money.toFixed(2)} to buy ${(weight / 1000).toFixed(2)} kilograms ${fruit}.`);
}
fruit("orange", 2500, 1.8);
fruit("apple", 1563, 2.35);
