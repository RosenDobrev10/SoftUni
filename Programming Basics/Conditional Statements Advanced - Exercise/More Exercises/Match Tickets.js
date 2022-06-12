function matchTickets(input) {
    let budget = Number(input[0]);
    let category = input[1];
    let people = Number(input[2]);
    let transport = 0;
    let ticketPrice = 0;

    if (people >= 1 && people <= 4) {
        transport = budget * 0.75;
    } else if (people >= 5 && people <= 9) {
        transport = budget * 0.6;
    } else if (people >= 10 && people <= 24) {
        transport = budget * 0.5;
    } else if (people >= 25 && people <= 49) {
        transport = budget * 0.4;
    } else if (people >= 50) {
        transport = budget * 0.25;
    }
    if (category === "VIP") {
        ticketPrice = 499.99;
    } else {
        ticketPrice = 249.99;
    }
    let diff = budget - transport - ticketPrice * people
    if (diff >= 0) {
        console.log(`Yes! You have ${diff.toFixed(2)} leva left.`);
    } else {
        console.log(`Not enough money! You need ${(Math.abs(diff)).toFixed(2)} leva.`);
    }
}
matchTickets(["30000", "VIP", "49"]);
