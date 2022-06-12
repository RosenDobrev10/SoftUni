function carToGo(input) {
    let budget = Number(input[0]);
    let season = input[1];
    let classCar = "";
    let type = "";
    let price = 0;

    if (budget <= 100) {
        classCar = "Economy class";
        if (season === "Summer") {
            type = "Cabrio";
            price = 0.35 * budget;
        } else {
            type = "Jeep";
            price = 0.65 * budget;
        }
    } else if (budget <= 500) {
        classCar = "Compact class";
        if (season === "Summer") {
            type = "Cabrio";
            price = 0.45 * budget;
        } else {
            type = "Jeep";
            price = 0.8 * budget;
        }
    } else {
        classCar = "Luxury class";
        type = "Jeep";
        price = 0.9 * budget;
    }
    console.log(`${classCar}`);
    console.log(`${type} - ${price.toFixed(2)}`);
}
carToGo(["450", "Summer"]);
