function coffeeMachine(input) {
    let drink = input[0];
    let sugar = input[1];
    let countDrinks = Number(input[2]);
    let finalPrice = 0;

    switch (drink) {
        case "Espresso":
            if (sugar === "Without") {
                finalPrice = countDrinks * 0.9;
            } else if (sugar === "Normal") {
                finalPrice = countDrinks * 1;
            } else if (sugar === "Extra") {
                finalPrice = countDrinks * 1.2;
            }
            break;
        case "Cappuccino":
            if (sugar === "Without") {
                finalPrice = countDrinks * 1;
            } else if (sugar === "Normal") {
                finalPrice = countDrinks * 1.2;
            } else if (sugar === "Extra") {
                finalPrice = countDrinks * 1.6;
            }
            break;
        case "Tea":
            if (sugar === "Without") {
                finalPrice = countDrinks * 0.5;
            } else if (sugar === "Normal") {
                finalPrice = countDrinks * 0.6;
            } else if (sugar === "Extra") {
                finalPrice = countDrinks * 0.7;
            }
            break;
    }
    if (sugar === "Without") {
        finalPrice = finalPrice * 0.65;
    }
    if (drink === "Espresso" && countDrinks >= 5) {
        finalPrice = finalPrice * 0.75;
    }
    if (finalPrice > 15) {
        finalPrice = finalPrice * 0.8;
    }
    console.log(`You bought ${countDrinks} cups of ${drink} for ${finalPrice.toFixed(2)} lv.`);
}
coffeeMachine(["Tea", "Extra", "3"]);
