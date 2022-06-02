function bestPlayer(input) {
    let index = 0;
    let command = input[index++];
    let mostGoals = Number.MIN_SAFE_INTEGER;
    let bestPlayer = "";
    let hattrick = false;

    while (command !== "END") {
        player = command;
        let goals = Number(input[index++]);
        if (goals > mostGoals) {
            mostGoals = goals;
            bestPlayer = player;
        }
        if (mostGoals >= 3) {
            hattrick = true;
        }
        if (mostGoals >= 10) {
            break;
        }
        command = input[index++];
    }
    console.log(`${bestPlayer} is the best player!`);
    if (hattrick) {
        console.log(`He has scored ${mostGoals} goals and made a hat-trick !!!`);
    } else {
        console.log(`He has scored ${mostGoals} goals.`);
    }
}
bestPlayer(["Neymar", "2", "Ronaldo", "1", "Messi", "3", "END"]);
