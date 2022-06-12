function vacation(input) {
    let index = 0;
    let neededMoney = Number(input[index++]);
    let currentMoney = Number(input[index++]);
    let counterDays = 0;
    let spendCounterDays = 0;

    while (currentMoney < neededMoney) {
        let spendOrSave = input[index++];
        let amount = Number(input[index++]);
        counterDays++;

        if (spendOrSave === "spend") {
            spendCounterDays++;
            currentMoney -= amount;
        } else {
            spendCounterDays = 0;
            currentMoney += amount;
        }
        if (currentMoney <= 0) {
            currentMoney = 0;
        }
        if (spendCounterDays === 5) {
            console.log("You can't save the money.");
            console.log(`${counterDays}`);
        }
    }
    if (currentMoney >= neededMoney) {
        console.log(`You saved the money for ${counterDays} days.`);
    }
}
vacation(["110","60","spend","10","spend","10","spend","10","spend","10","spend","10",]);
