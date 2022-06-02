function familyTrip(input) {
    let budget = Number(input[0]);
    let nights = Number(input[1]);
    let priceNight = Number(input[2]);
    let extraCostPercent = Number(input[3]);

    let extraCost = (extraCostPercent * budget) / 100;
    if (nights > 7) {
        priceNight *=  0.95;
    }
    let allCost = extraCost + nights * priceNight;
    let diff = Math.abs(allCost - budget);
    if (budget >= allCost) {
        console.log(`Ivanovi will be left with ${diff.toFixed(2)} leva after vacation.`);
    } else {
        console.log(`${diff.toFixed(2)} leva needed.`);
    }
}
familyTrip(["500", "7", "66", "15"]);
