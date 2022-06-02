function paintingEggs(input) {
    let size = input[0];
    let color = input[1];
    let number = Number(input[2]);
    let profit = 0;

    switch (color) {
        case "Red":
            if (size === "Large") {
                profit = number * 16;
            } else if (size === "Medium") {
                profit = number * 13;
            } else {
                profit = number * 9;
            }
            break;
        case "Green":
            if (size === "Large") {
                profit = number * 12;
            } else if (size === "Medium") {
                profit = number * 9;
            } else {
                profit = number * 8;
            }
            break;
        case "Yellow":
            if (size === "Large") {
                profit = number * 9;
            } else if (size === "Medium") {
                profit = number * 7;
            } else {
                profit = number * 5;
            }
            break;
    }
    let finalProfit = profit * 0.65;
    console.log(`${finalProfit.toFixed(2)} leva.`);
}
paintingEggs(["Small", "Yellow", "3"]);
