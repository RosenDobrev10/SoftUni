function maidenParty(input) {
    let priceMaidenParty = Number(input[0]);
    let loveLetters = Number(input[1]);
    let waxRoses = Number(input[2]);
    let keyholder = Number(input[3]);
    let caricature = Number(input[4]);
    let luckySurprise = Number(input[5]);

    let profit = loveLetters * 0.6 + waxRoses * 7.2 + keyholder * 3.6 + caricature * 18.2 + luckySurprise * 22;
    let articles = loveLetters + waxRoses + keyholder + caricature + luckySurprise;
    if (articles >= 25) {
        profit *= 0.65;
        profit *= 0.9
    }
    if (profit >= priceMaidenParty) {
        console.log(`Yes! ${(profit - priceMaidenParty).toFixed(2)} lv left.`);
    } else {
        console.log(`Not enough money! ${(priceMaidenParty - profit).toFixed(2)} lv needed.`);
    }
}
maidenParty(["40.8", "20", "25", "30", "50", "10"]);
