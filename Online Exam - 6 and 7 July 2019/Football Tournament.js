function footballTournament(input) {
    let index = 0;
    let team = input[index++];
    let games = Number(input[index++]);
    let points = 0;
    let wins = 0;
    let draws = 0;
    let losses = 0;

    for (let i = 0; i < games; i++) {
        let currentGame = input[index++];
        if (currentGame === "W") {
            points += 3;
            wins++;
        } else if (currentGame === "D") {
            points += 1;
            draws++;
        } else if (currentGame === "L") {
            losses++;
        }
    }
    let winRate = (wins / games) * 100;
    if (games === 0) {
        console.log(`${team} hasn't played any games during this season.`);
    } else {
        console.log(`${team} has won ${points} points during this season.`);
        console.log("Total stats:");
        console.log(`## W: ${wins}`);
        console.log(`## D: ${draws}`);
        console.log(`## L: ${losses}`);
        console.log(`Win rate: ${winRate.toFixed(2)}%`);
    }
}
footballTournament(["Chelsea", "0"]);
