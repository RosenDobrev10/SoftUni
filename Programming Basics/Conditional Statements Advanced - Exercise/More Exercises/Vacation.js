function vacation(input) {
    let budget = Number(input[0]);
    let season = input[1];
    let location = "";
    let type = "";
    let price = 0;

    if (budget <= 1000) {
        type = "Camp";
        if (season === "Summer") {
            location = "Alaska";
            price = 0.65 * budget;
        } else {
            location = "Morocco";
            price = 0.45 * budget;
        }
    } else if (budget <= 3000) {
        type = "Hut";
        if (season === "Summer") {
            location = "Alaska";
            price = 0.8 * budget;
        } else {
            location = "Morocco";
            price = 0.6 * budget;
        }
    } else {
        type = "Hotel";
        price = 0.9 * budget;
        if (season === "Summer") {
            location = "Alaska";
        } else {
            location = "Morocco";
        }
    }
    console.log(`${location} - ${type} - ${price.toFixed(2)}`);
}
vacation(["800", "Summer"]);
