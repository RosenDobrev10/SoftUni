function vetParking(input) {
    let days = Number(input[0]);
    let hours = Number(input[1]);
    let allMoney = 0;

    for (let i = 1; i <= days; i++) {
        let hourMoney = 0;
        let dayMoney = 0;
        for (let z = 1; z <= hours; z++) {
            if (i % 2 === 0 && z % 2 !== 0) {
                hourMoney = 2.5;
            } else if (i % 2 !== 0 && z % 2 === 0) {       // ВЛОЖЕНИ ЦИКЛИ 
                hourMoney = 1.25;
            } else {
                hourMoney = 1;
            }
            dayMoney += hourMoney;
            allMoney += hourMoney;
        }
        console.log(`Day: ${i} - ${dayMoney.toFixed(2)} leva`);
    }
    console.log(`Total: ${allMoney.toFixed(2)} leva`);
}
vetParking(["2", "5"]);
