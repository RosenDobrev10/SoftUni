function tournamentOfChristmas(input) {
    let index = 0;
    let days = Number(input[index++]);
    let winsAllDays = 0;
    let lossesAllDays = 0;
    let raiseMoney = 0;

    for (let i = 0; i < days; i++) {
        let command = input[index++];
        let earnMoneyForDay = 0;
        let winsByDay = 0;
        let lossesByDay = 0;

        while (command !== "Finish") {
            sport = command;
            let winOrLose = input[index++];
            if (winOrLose === "win") {
                earnMoneyForDay += 20;
                winsByDay++;
            } else {
                lossesByDay++;
            }
            command = input[index++];
        }
        if (winsByDay > lossesByDay) {
            earnMoneyForDay *= 1.1;
            winsAllDays++;
        } else {
            lossesAllDays++;
        }
        raiseMoney += earnMoneyForDay;
    }
    if (winsAllDays > lossesAllDays) {
        raiseMoney *= 1.2;
        console.log(`You won the tournament! Total raised money: ${raiseMoney.toFixed(2)}`);
    } else {
        console.log(`You lost the tournament! Total raised money: ${raiseMoney.toFixed(2)}`);
    }
}
tournamentOfChristmas(["3","darts","lose","handball","lose","judo","win","Finish",
"snooker","lose","swimming","lose","squash","lose","table tennis","win","Finish",
"volleyball","win","basketball","win","Finish",]);
