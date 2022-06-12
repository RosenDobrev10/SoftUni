function goldMine(input) {
    let index = 0;
    let locations = Number(input[index++]);

    for (let i = 1; i <= locations; i++) {
        let expectedYield = Number(input[index++]);
        let days = Number(input[index++]);
        let allYields = 0;
        for (let j = 1; j <= days; j++) {
            let yield = Number(input[index++]);
            allYields += yield;
        }
        if (allYields / days >= expectedYield) {
            console.log(`Good job! Average gold per day: ${(allYields / days).toFixed(2)}.`);
        } else {
            console.log(`You need ${(expectedYield - allYields / days).toFixed(2)} gold.`);
        }
    }
}
goldMine(["2", "10", "3", "10", "10", "11", "20", "2", "20", "10"]);
goldMine(["1", "5", "3", "10", "1", "3"]);
