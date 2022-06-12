function shopping(input) {
    let budget = Number(input[0]);
    let countVideocard = Number(input[1]);
    let countProcessor = Number(input[2]);
    let countRamMemory = Number(input[3]);

    let priceVideocard = 250;
    let priceProcessor = 0.35 * countVideocard * priceVideocard;
    let priceRamMemory = 0.1 * countVideocard * priceVideocard;
    let finalPrice = countVideocard * priceVideocard + countProcessor * priceProcessor + countRamMemory * priceRamMemory;
    if (countVideocard > countProcessor) {
        finalPrice = finalPrice - finalPrice * 0.15;
    }
    if (finalPrice <= budget) {
        let leftBudget = budget - finalPrice;
        console.log(`You have ${leftBudget.toFixed(2)} leva left!`);
    } else {
        let diff = Math.abs(finalPrice - budget);
        console.log(`Not enough money! You need ${diff.toFixed(2)} leva more!`);
    }
}
shopping(["920.45", "3", "1", "1"]);
