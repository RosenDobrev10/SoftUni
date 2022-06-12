function renovation(input) {
    let index = 0;
    let height = Number(input[index++]);
    let width = Number(input[index++]);
    let wallsNotPainted = Number(input[index++]);
    let wallsToPaint = height * width * 4;
    let finalSquaresToPaint = Math.ceil(wallsToPaint - (wallsNotPainted / 100) * wallsToPaint);
    let command = input[index++];

    while (command !== "Tired!") {
        let liters = Number(command);
        finalSquaresToPaint -= liters;
        if (finalSquaresToPaint <= 0) {
            break;
        }
        command = input[index++];
    }
    if (finalSquaresToPaint > 0) {
        console.log(`${finalSquaresToPaint} quadratic m left.`);
    } else if (finalSquaresToPaint === 0) {
        console.log("All walls are painted! Great job, Pesho!");
    } else {
        console.log(`All walls are painted and you have ${Math.abs(finalSquaresToPaint)} l paint left!`);
    }
}
renovation(["2", "3", "25", "6", "7", "8"]);
