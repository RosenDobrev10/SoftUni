function cleverLily(input) {
    let age = Number(input[0]);
    let washingMachine = Number(input[1]);
    let pricePerToy = Number(input[2]);

    let bonusMoney = 0;
    let moneyFromBirthdays = 0;
    let toysCount = 0;

    for (let i = 1; i <= age; i++) {
        if (i % 2 === 0) {
            bonusMoney += 10;
            moneyFromBirthdays += bonusMoney;
            moneyFromBirthdays--;
        } else {
            toysCount++;
        }
    }
    let allMoney = moneyFromBirthdays + toysCount * pricePerToy;
    let diff = Math.abs(allMoney - washingMachine);

    if (allMoney >= washingMachine) {
        console.log(`Yes! ${diff.toFixed(2)}`);
    } else {
        console.log(`No! ${diff.toFixed(2)}`);
    }
}
cleverLily(["21", "1570.98", "3"]);
