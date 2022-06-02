function careOfPuppy(input) {
    let index = 0;
    let food = Number(input[index++]);
    let command = input[index++];
    let foodInGrams = food * 1000;

    while (command !== "Adopted") {
        let currentFood = Number(command);
        foodInGrams -= currentFood;
        command = input[index++];
    }
    if (foodInGrams >= 0) {
        console.log(`Food is enough! Leftovers: ${foodInGrams} grams.`);
    } else {
        let needFood = Math.abs(foodInGrams);
        console.log(`Food is not enough. You need ${needFood} grams more.`);
    }
}
careOfPuppy(["2", "999", "456", "999", "999", "123", "456", "Adopted"]);
