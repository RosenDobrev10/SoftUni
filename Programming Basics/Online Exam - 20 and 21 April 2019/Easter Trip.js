function easterTrip(input) {
    let destination = input[0];
    let period = input[1];
    let nights = Number(input[2]);
    let money = 0;

    switch (period) {
        case "21-23":
            if (destination === "France") {
                money = nights * 30;
            } else if (destination === "Italy") {
                money = nights * 28;
            } else {
                money = nights * 32;
            }
            break;
        case "24-27":
            if (destination === "France") {
                money = nights * 35;
            } else if (destination === "Italy") {
                money = nights * 32;
            } else {
                money = nights * 37;
            }
            break;
        case "28-31":
            if (destination === "France") {
                money = nights * 40;
            } else if (destination === "Italy") {
                money = nights * 39;
            } else {
                money = nights * 43;
            }
            break;
    }
    console.log(`Easter trip to ${destination} : ${money.toFixed(2)} leva.`);
}
easterTrip(["France", "28-31", "8"]);
