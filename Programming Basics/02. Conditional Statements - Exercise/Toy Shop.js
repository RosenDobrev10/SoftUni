function toyShop(input) {
    let priceExcursion = Number(input[0]);
    let countPuzzle = Number(input[1]);
    let countDoll = Number(input[2]);
    let countBear = Number(input[3]);
    let countMinion = Number(input[4]);
    let countTruck = Number(input[5]);

    let allCountToys = countPuzzle + countDoll + countBear + countMinion + countTruck;
    let priceToys = countPuzzle * 2.6 + countDoll * 3 + countBear * 4.1 + countMinion * 8.2 + countTruck * 2;
    if (allCountToys >= 50) {
        priceToys = priceToys - priceToys * 0.25;
    }

    let rent = 0.1 * priceToys;
    let earnMoney = priceToys - rent;
    let diff = Math.abs(earnMoney - priceExcursion);
    if (earnMoney >= priceExcursion) {
        console.log(`Yes! ${diff.toFixed(2)} lv left.`);
    } else {
        console.log(`Not enough money! ${diff.toFixed(2)} lv needed.`);
    }
}
toyShop(["320", "8", "2", "5", "5", "1"]);
