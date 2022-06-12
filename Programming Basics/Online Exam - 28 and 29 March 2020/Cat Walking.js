function catWalking(input) {
    let minutes = Number(input[0]);
    let walks = Number(input[1]);
    let calories = Number(input[2]);

    let allCalories = minutes * walks * 5;
    let targetCalories = calories * 0.5;

    if (allCalories >= targetCalories) {
        console.log(`Yes, the walk for your cat is enough. Burned calories per day: ${allCalories}.`);
    } else {
        console.log(`No, the walk for your cat is not enough. Burned calories per day: ${allCalories}.`);
    }
}
catWalking(["15", "2", "500"]);
