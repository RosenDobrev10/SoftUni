function fishingBoat(input) {
    let budget = Number(input[0]);
    let season = input[1];
    let fisherman = Number(input[2]);

    let rentBoat = 0.0;

    if (season === "Spring") {
        rentBoat = 3000;
    } else if (season === "Summer" || season === "Autumn") {
        rentBoat = 4200;
    } else {
        rentBoat = 2600;
    }

    if (fisherman <= 6) {
        rentBoat = rentBoat * 0.9;
    } else if (fisherman >= 7 && fisherman <= 11) {
        rentBoat = rentBoat * 0.85;
    } else if (fisherman >= 12) {
        rentBoat = rentBoat * 0.75;
    }
    if (fisherman % 2 === 0 && season !== "Autumn") {
        rentBoat = rentBoat * 0.95;
    }

    let diff = Math.abs(rentBoat - budget);

    if (rentBoat <= budget) {
        console.log(`Yes! You have ${diff.toFixed(2)} leva left.`);
    } else {
        console.log(`Not enough money! You need ${diff.toFixed(2)} leva.`);
    }
}
fishingBoat(["3000", "Summer", "11"]);
