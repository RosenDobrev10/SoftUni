function oscars(input) {
    let index = 0;
    let nameActor = input[index++];
    let pointsActor = Number(input[index++]);
    let numberJudges = Number(input[index++]);
    let points = 0;

    for (let i = 0; i < numberJudges; i++) {
        let judge = input[index++];
        let pointsJudge = Number(input[index++]);
        points = judge.length * pointsJudge / 2;
        pointsActor += points;
        if (pointsActor > 1250.5) {
            break;
        }
    }
    let diff = Math.abs(pointsActor - 1250.5);
    if (pointsActor > 1250.5) {
        console.log(`Congratulations, ${nameActor} got a nominee for leading role with ${pointsActor.toFixed(1)}!`);
    } else {
        console.log(`Sorry, ${nameActor} you need ${diff.toFixed(1)} more!`);
    }
}
oscars(["Sandra Bullock","340","5","Robert De Niro","50","Julia Roberts","40.5","Daniel Day-Lewis","39.4","Nicolas Cage","29.9","Stoyanka Mutafova","33",]);
