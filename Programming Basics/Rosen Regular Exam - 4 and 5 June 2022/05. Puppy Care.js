function puppyCare(input) {
    let foodInKG = Number(input[0]);
    let foodInGrams = foodInKG * 1000;
    let index = 1;
    let command = input[index++];

    while (command !== "Adopted") {
        let eatenFood = Number(command);
        foodInGrams -= eatenFood;
        command = input[index++];
    }
    if (foodInGrams < 0) {
        console.log(`Food is not enough. You need ${Math.abs(foodInGrams)} grams more.`);
    } else {
        console.log(`Food is enough! Leftovers: ${foodInGrams} grams.`);
    }
}
puppyCare(["4", "130", "345", "400", "180", "230", "120", "Adopted"]);
puppyCare(["3", "1000", "1000", "1000", "Adopted"]);
puppyCare(["2", "999", "456", "999", "999", "123", "456", "Adopted"]);
