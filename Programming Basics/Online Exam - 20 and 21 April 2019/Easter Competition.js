function easterCompetition(input) {
    let index = 0;
    let contestants = input[index++];
    let name = input[index++];
    let numberOne = Number.MIN_SAFE_INTEGER;
    let champion = "";

    for (let i = 0; i < contestants; i++) {
        let command = input[index++];
        let currentPoints = 0;
        while (command !== "Stop") {
            let grade = Number(command);
            currentPoints += grade;
            command = input[index++];
        }
        console.log(`${name} has ${currentPoints} points.`);
        if (currentPoints > numberOne) {
            numberOne = currentPoints;
            champion = name;
            console.log(`${name} is the new number 1!`);
        }
        name = input[index++];
    }
    console.log(`${champion} won competition with ${numberOne} points!`);
}
easterCompetition(["3","Chef Manchev","10","10","10","10","Stop","Natalie","8","2","9","Stop","George","9","2","4","2","Stop",]);
