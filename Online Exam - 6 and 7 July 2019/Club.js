function club(input) {
    let index = 0;
    let targetSum = Number(input[index++]);
    let command = input[index++];
    let profit = 0;

    while (command !== "Party!") {
        let cocktail = command;
        let numberCocktails = Number(input[index++]);
        let order = cocktail.length * numberCocktails;
        if (order % 2 === 1) {
            order *= 0.75;
        }
        profit += order;
        if (profit >= targetSum) {
            console.log("Target acquired.");
            break;
        }
        command = input[index++];
    }
    if (command === "Party!") {
        console.log(`We need ${(targetSum - profit).toFixed(2)} leva more.`);
    }
    console.log(`Club income - ${profit.toFixed(2)} leva.`);
}
club(["100", "Sidecar", "7", "Mojito", "5", "White Russian", "10"]);
