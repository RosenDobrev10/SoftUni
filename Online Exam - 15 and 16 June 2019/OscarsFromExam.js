function oscarsFromExam(input) {
    let index = 0;
    let nameActor = input[index++];
    let academyPoints = Number(input[index++]);
    let numberJudges = Number(input[index++]);
    let points = 0;
    for (let i = 0; i < numberJudges; i++) {
        let judge = input[index++];
        let judgePoints = Number(input[index++]);
        points = judge.length * judgePoints / 2;
        academyPoints += points;
        if (academyPoints > 1250.5) {
            console.log(`Congratulations, ${nameActor} got a nominee for leading role with ${academyPoints.toFixed(1)}!`);
            break;
        }
    }
    if (academyPoints <= 1250.5) {
        console.log(`Sorry, ${nameActor} you need ${(1250.5 - academyPoints).toFixed(1)} more!`);
    }
}
oscarsFromExam(["Zahari Baharov","205","4","Johnny Depp","45","Will Smith","29","Jet Lee","10","Matthew Mcconaughey","39"])
