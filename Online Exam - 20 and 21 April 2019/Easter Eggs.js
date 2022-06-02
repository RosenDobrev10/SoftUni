function easterEggs(input) {
    let index = 0;
    let number = Number(input[index++]);
    let redEggs = 0;
    let orangeEggs = 0;
    let blueEggs = 0;
    let greenEggs = 0;
    let maxEggs = 0;
    let color = "";

    for (let i = 0; i < number; i++) {
        let currentColor = input[index++];
        if (currentColor === "red") {
            redEggs++;
        } else if (currentColor === "orange") {
            orangeEggs++;
        } else if (currentColor === "blue") {
            blueEggs++;
        } else {
            greenEggs++;
        }
    }
    if (redEggs > maxEggs) {
        maxEggs = redEggs;
        color = "red";
    }
    if (orangeEggs > maxEggs) {
        maxEggs = orangeEggs;
        color = "orange";
    }
    if (blueEggs > maxEggs) {
        maxEggs = blueEggs;
        color = "blue";
    }
    if (greenEggs > maxEggs) {
        maxEggs = greenEggs;
        color = "green";
    }
    console.log(`Red eggs: ${redEggs}`);
    console.log(`Orange eggs: ${orangeEggs}`);
    console.log(`Blue eggs: ${blueEggs}`);
    console.log(`Green eggs: ${greenEggs}`);
    console.log(`Max eggs: ${maxEggs} -> ${color}`);
}
easterEggs(["4", "blue", "red", "blue", "orange"]);
