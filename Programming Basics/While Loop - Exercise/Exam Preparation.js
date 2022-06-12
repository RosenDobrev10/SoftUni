function examPreparation(input) {
    let index = 0;
    let numberNegativeGrade = Number(input[index++]);
    let command = input[index++];
    let countNegativeGrade = 0;
    let totalScore = 0;
    let countProblems = 0;
    let taskName = "";

    while (command !== "Enough") {
        taskName = command;
        let currentGrade = Number(input[index++]);
        if (currentGrade <= 4) {
            countNegativeGrade++;
            if (countNegativeGrade === numberNegativeGrade) {
                break;
            }
        }
        countProblems++;
        totalScore += currentGrade;
        command = input[index++];
    }
    let averageScore = totalScore / countProblems;
    if (countNegativeGrade === numberNegativeGrade) {
        console.log(`You need a break, ${countNegativeGrade} poor grades.`);
    } else {
        console.log(`Average score: ${averageScore.toFixed(2)}`);
        console.log(`Number of problems: ${countProblems}`);
        console.log(`Last problem: ${taskName}`);
    }
}
examPreparation(["2", "Income", "3", "Game Info", "6", "Best Player", "4"]);
