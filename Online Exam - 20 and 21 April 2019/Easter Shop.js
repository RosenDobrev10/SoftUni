function easterShop(input) {
    let index = 0;
    let initialAmount = Number(input[index++]);
    let command = input[index++];
    let soldEggs = 0;

    while (command !== "Close") {
        BuyOrFill = command;
        amount = Number(input[index++]);
        if (BuyOrFill === "Buy") {
            if (amount > initialAmount) {
                console.log("Not enough eggs in store!");
                console.log(`You can buy only ${initialAmount}.`);
                break;
            } else {
                initialAmount -= amount;
                soldEggs += amount;
            }
        } else if (BuyOrFill === "Fill") {
            initialAmount += amount;
        }
        command = input[index++];
    }
    if (command === "Close") {
        console.log("Store is closed!");
        console.log(`${soldEggs} eggs sold.`);
    }
}
easterShop(["20", "Fill", "30", "Buy", "15", "Buy", "20", "Close"]);
