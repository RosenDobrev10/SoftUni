function worldSnookerChampionship(input) {
    let phase = input[0];
    let ticket = input[1];
    let numberTickets = Number(input[2]);
    let photo = input[3];
    let price = 0;

    switch (phase) {
        case "Quarter final":
            if (ticket === "Standard") {
                price = numberTickets * 55.5;
            } else if (ticket === "Premium") {
                price = numberTickets * 105.2;
            } else {
                price = numberTickets * 118.9;
            }
            break;
        case "Semi final":
            if (ticket === "Standard") {
                price = numberTickets * 75.88;
            } else if (ticket === "Premium") {
                price = numberTickets * 125.22;
            } else {
                price = numberTickets * 300.4;
            }
            break;
        case "Final":
            if (ticket === "Standard") {
                price = numberTickets * 110.1;
            } else if (ticket === "Premium") {
                price = numberTickets * 160.66;
            } else {
                price = numberTickets * 400;
            }
            break;
    }
    if (price > 4000) {
        price = price * 0.75;
    } else if (price > 2500 && photo === "Y") {
        price = price * 0.9 + numberTickets * 40;
    } else if (price > 2500 && photo === "N") {
        price = price * 0.9;
    } else if (price < 2500 && photo === "Y") {
        price += numberTickets * 40;
    } else if (price < 2500 && photo === "N") {
        price = price;
    }
    console.log(price.toFixed(2));
}
worldSnookerChampionship(["Final", "Premium", "25", "Y"]);
