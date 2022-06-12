function excursionCalculator(input) {
    let people = Number(input[0]);
    let season = input[1];
    let price = 0;

    switch (season) {
        case "spring":
            if (people <= 5) {
                price = 50;
            } else {
                price = 48;
            }
            break;
        case "summer":
            if (people <= 5) {
                price = 48.5 * 0.85;
            } else {
                price = 45 * 0.85;
            }
            break;
        case "autumn":
            if (people <= 5) {
                price = 60;
            } else {
                price = 49.5;
            }
            break;
        case "winter":
            if (people <= 5) {
                price = 86 * 1.08;
            } else {
                price = 85 * 1.08;
            }
            break;
    }
    price *= people;
    console.log(`${price.toFixed(2)} leva.`);
}
excursionCalculator(["5", "spring"]);
