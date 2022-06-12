function gameNumberWars(input) {
    let index = 0;
    let firstPlayer = input[index++];
    let secondPlayer = input[index++];
    let command = input[index++];
    let pointsFirstPlayer = 0;
    let pointsSecondPlayer = 0;

    while (command !== "End of game") {
        let cardFirstPlayer = Number(command);
        let cardSecondPlayer = Number(input[index++]);

        if (cardFirstPlayer > cardSecondPlayer) {
            pointsFirstPlayer += cardFirstPlayer - cardSecondPlayer;
        } else if (cardFirstPlayer < cardSecondPlayer) {
            pointsSecondPlayer += cardSecondPlayer - cardFirstPlayer;
        } else if (cardFirstPlayer === cardSecondPlayer) {
            console.log("Number wars!");
            nextCardFirstPlayer = Number(input[index++]);
            nextCardSecondPlayer = Number(input[index++]);
            if (nextCardFirstPlayer > nextCardSecondPlayer) {
                console.log(`${firstPlayer} is winner with ${pointsFirstPlayer} points`);
            } else {
                console.log(`${secondPlayer} is winner with ${pointsSecondPlayer} points`);
            }
            break;
        }
        command = input[index++];
    }
    if (command === "End of game"){
    console.log(`${firstPlayer} has ${pointsFirstPlayer} points`);
    console.log(`${secondPlayer} has ${pointsSecondPlayer} points`);
}
}
gameNumberWars(["Aleks","Georgi","4","5","3","2","4","3","4","4","5","2",]);
