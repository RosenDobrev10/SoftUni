function aluminiumJoinery(input) {
    let number = Number(input[0]);
    let type = input[1];
    let delivery = input[2];
    let price = 0;

    if (number < 10) {
        console.log("Invalid order");
        return;
    }

    switch (type) {
        case "90X130":
            if (number >= 10 && number <= 30) {
                price = 110 * number;
            } else if (number > 30 && number <= 60) {
                price = 110 * number * 0.95;
            } else if (number > 60) {
                price = 110 * number * 0.92;
            }
            break;
        case "100X150":
            if (number >= 10 && number <= 40) {
                price = 140 * number;
            } else if (number > 40 && number <= 80) {
                price = 140 * number * 0.94;
            } else if (number > 80) {
                price = 140 * number * 0.9;
            }
            break;
        case "130X180":
            if (number >= 10 && number <= 20) {
                price = 190 * number;
            } else if (number > 20 && number <= 50) {
                price = 190 * number * 0.93;
            } else if (number > 50) {
                price = 190 * number * 0.88;
            }
            break;
        case "200X300":
            if (number >= 10 && number <= 25) {
                price = 250 * number;
            } else if (number > 25 && number <= 50) {
                price = 250 * number * 0.91;
            } else if (number > 50) {
                price = 250 * number * 0.86;
            }
            break;
    }
    if (delivery === "With delivery") {
        price += 60;
        if (number > 99) {
            price *= 0.96;
        }
    } else if (delivery === "Without delivery") {
        if (number > 99) {
            price *= 0.96;
        }
    }
    console.log(`${price.toFixed(2)} BGN`);
}
aluminiumJoinery(["2", "130X180", "With delivery"]);
