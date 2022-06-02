function movieDestination(input) {
    let budget = Number(input[0]);
    let destination = input[1];
    let season = input[2];
    let days = Number(input[3]);
    let money = 0;

    switch (destination) {
        case "Dubai":
            if (season === "Winter") {
                money = days * 45000 * 0.7;
            } else {
                money = days * 40000 * 0.7;
            }
            break;
        case "Sofia":
            if (season === "Winter") {
                money = days * 17000 * 1.25;
            } else {
                money = days * 12500 * 1.25;
            }
            break;
        case "London":
            if (season === "Winter") {
                money = days * 24000;
            } else {
                money = days * 20250;
            }
            break;
    }
    let diff = Math.abs(money - budget);
    if (budget >= money) {
        console.log( `The budget for the movie is enough! We have ${diff.toFixed(2)} leva left!`);
    } else {
        console.log(`The director needs ${diff.toFixed(2)} leva more!`);
    }
}
movieDestination(["200000", "London", "Summer", "7"]);
