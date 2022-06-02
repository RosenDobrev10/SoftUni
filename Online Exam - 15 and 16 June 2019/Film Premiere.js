function filmPremiere(input) {
    let movie = input[0];
    let packet = input[1];
    let tickets = Number(input[2]);
    let profit = 0;

    switch (movie) {
        case "John Wick":
            if (packet === "Drink") {
                profit = tickets * 12;
            } else if (packet === "Popcorn") {
                profit = tickets * 15;
            } else if (packet === "Menu") {
                profit = tickets * 19;
            }
            break;
        case "Star Wars":
            if (packet === "Drink") {
                profit = tickets * 18;
            } else if (packet === "Popcorn") {
                profit = tickets * 25;
            } else if (packet === "Menu") {
                profit = tickets * 30;
            }
            break;
        case "Jumanji":
            if (packet === "Drink") {
                profit = tickets * 9;
            } else if (packet === "Popcorn") {
                profit = tickets * 11;
            } else if (packet === "Menu") {
                profit = tickets * 14;
            }
            break;
    }
    if (movie === "Star Wars" && tickets >= 4) {
        profit = profit * 0.7;
    }
    if (movie === "Jumanji" && tickets === 2) {
        profit = profit * 0.85;
    }
    console.log(`Your bill is ${profit.toFixed(2)} leva.`);
}
filmPremiere(["Jumanji", "Menu", "2"]);
