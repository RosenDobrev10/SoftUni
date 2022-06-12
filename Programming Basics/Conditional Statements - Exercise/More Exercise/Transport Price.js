function transportPrice(input) {
    let kilometers = Number(input[0]);
    let dayOrNight = input[1];
    let priceTaxi = 0.0;
    if (dayOrNight === "day") {
        priceTaxi = 0.7 + 0.79 * kilometers;
    } else if (dayOrNight === "night") {
        priceTaxi = 0.7 + 0.9 * kilometers;
    }
    let priceBus = 0.09 * kilometers;
    let priceTrain = 0.06 * kilometers;

    if (kilometers < 20) {
        console.log(priceTaxi.toFixed(2));
    } else if (kilometers >= 20 && kilometers < 100) {
        console.log(priceBus.toFixed(2));
    } else {
        console.log(priceTrain.toFixed(2));
    }
}
transportPrice(["5", "day"]);
