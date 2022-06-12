function travelAgency(input) {
    let town = input[0];
    let packet = input[1];
    let vip = input[2];
    let days = input[3];
    let price = 0;
    let isValid = false;

    if (days > 7) {
        days--;
    }

    switch (town) {
        case "Bansko":
        case "Borovets":
            if (packet === "withEquipment") {
                if (vip === "yes") {
                    price = days * 100 * 0.9;
                } else {
                    price = days * 100;
                }
            } else if (packet === "noEquipment") {
                if (vip === "yes") {
                    price = days * 80 * 0.95;
                } else {
                    price = days * 80;
                }
            } else {
                isValid = true;
            }
            break;
        case "Varna":
        case "Burgas":
            if (packet === "withBreakfast") {
                if (vip === "yes") {
                    price = days * 130 * 0.88;
                } else {
                    price = days * 130;
                }
            } else if (packet === "noBreakfast") {
                if (vip === "yes") {
                    price = days * 100 * 0.93;
                } else {
                    price = days * 100;
                }
            } else {
                isValid = true;
            }
            break;
        default:
            console.log("Invalid input!");
            return;
    }
    if (isValid) {
        console.log("Invalid input!");
    } else if (days < 1) {
        console.log("Days must be positive number!");
    } else {
        console.log(`The price is ${price.toFixed(2)}lv! Have a nice time!`);
    }
}
travelAgency(["Borovets", "noEquipmentt", "yes", "6"]);
