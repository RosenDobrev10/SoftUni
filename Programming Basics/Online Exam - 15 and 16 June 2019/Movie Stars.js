function movieStars(input) {
    let index = 0;
    let budget = Number(input[index++]);
    let command = input[index++];
    let salary = 0;

    while (command !== "ACTION") {
        let movieStar = command;
        if (movieStar.length <= 15) {
            salary = Number(input[index++]);
        } else {
            salary = budget * 0.2;
        }
        budget -= salary;
        if (budget <= 0) {
            break;
        }
        command = input[index++];
    }
    if (budget >= 0) {
        console.log(`We are left with ${budget.toFixed(2)} leva.`);
    } else {
        console.log(`We need ${(Math.abs(budget)).toFixed(2)} leva for our actors.`);
    }
}
movieStars(["90000","Christian Bale","70000.50","Leonard DiCaprio","Kevin Spacey","24000.99"])
