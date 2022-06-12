function bestPlayer(input) {
    let index = 0;
    let command = input[index++];
    let bestPlayer = "";
    let mostGoals = Number.MIN_SAFE_INTEGER;

    while (command !== "END") {
        player = command;
        let goals = Number(input[index++]);
        if (goals > mostGoals) {
            mostGoals = goals;
            bestPlayer = player;
        }
        if (goals >= 10) {
            break;
        }
        command = input[index++];
    }

    console.log(`${bestPlayer} is the best player!`);
    if (mostGoals >= 3) {
        console.log(`He has scored ${mostGoals} goals and made a hat-trick !!!`);
    } else {
        console.log(`He has scored ${mostGoals} goals.`);
    }
}
bestPlayer(["Rooney", "1", "Junior", "2", "Paolinio", "2", "END"]);