function agencyProfit(input) {
    let aviocompany = input[0];
    let adultTickets = Number(input[1]);
    let kidTickets = Number(input[2]);
    let priceAdult = Number(input[3]);
    let tax = Number(input[4]);

    let priceKid = priceAdult * 0.3;
    let finalPrice = adultTickets * (priceAdult + tax) + kidTickets * (priceKid + tax);
    let profit = finalPrice * 0.2;
    console.log(`The profit of your agency from ${aviocompany} tickets is ${profit.toFixed(2)} lv.`);
}
agencyProfit(["Ryanair", "60", "23", "158.96", "39.12"]);
