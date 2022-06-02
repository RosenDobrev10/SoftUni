function energyBooster(input) {
    let fruit = input[0];
    let type = input[1];
    let amount = Number(input[2]);
    let price = 0;

    switch (fruit) {
        case "Watermelon":
            if (type === "small") {
                price = amount * 56.0 * 2;
            } else {
                price = amount * 28.7 * 5;
            }
            break;
        case "Mango":
            if (type === "small") {
                price = amount * 36.66 * 2;
            } else {
                price = amount * 19.6 * 5;
            }
            break;
        case "Pineapple":
            if (type === "small") {
                price = amount * 42.1 * 2;
            } else {
                price = amount * 24.8 * 5;
            }
            break;
        case "Raspberry":
            if (type === "small") {
                price = amount * 20.0 * 2;
            } else {
                price = amount * 15.2 * 5;
            }
            break;
    }
    if (price >= 400 && price <= 1000) {
        price *= 0.85;
    } else if (price > 1000) {
        price *= 0.5;
    }
    console.log(`${price.toFixed(2)} lv.`);
}
energyBooster(["Mango", "big", "8"]);
