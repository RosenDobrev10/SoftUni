function basketballTournament(input) {
    let index = 0;
    let command = input[index++];
    let wins = 0;
    let losses = 0;
    let numberMatches = 0;

    while (command !== "End of tournaments") {
        let tournament = command;
        let matches = Number(input[index++]);
        for (let i = 1; i <= matches; i++) {
            numberMatches++;
            let firstTeam = Number(input[index++]);
            let secondTeam = Number(input[index++]);
            if (firstTeam > secondTeam) {
                wins++;
                console.log(`Game ${i} of tournament ${tournament}: win with ${firstTeam - secondTeam} points.`);
            } else {
                losses++;
                console.log(`Game ${i} of tournament ${tournament}: lost with ${secondTeam - firstTeam} points.`);
            }
        }
        command = input[index++];
    }
    console.log(`${((wins / numberMatches) * 100).toFixed(2)}% matches win`);
    console.log(`${((losses / numberMatches) * 100).toFixed(2)}% matches lost`);
}
basketballTournament(["Ballers","3","87","63","56","65","75","64",
"Sharks","4","64","76","65","86","68","99","45","78","End of tournaments",]);
