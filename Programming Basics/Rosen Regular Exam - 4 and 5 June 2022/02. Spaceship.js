function spaceship(input) {
    let width = Number(input[0]);
    let length = Number(input[1]);
    let height = Number(input[2]);
    let averageHeight = Number(input[3]);

    let volumeSpaceship = width * length * height;
    let volumeRoom = (averageHeight + 0.4) * 4;
    let numberCrew = Math.floor(volumeSpaceship / volumeRoom);

    if (numberCrew >= 3 && numberCrew <= 10) {
        console.log(`The spacecraft holds ${numberCrew} astronauts.`);
    } else if (numberCrew < 3) {
        console.log("The spacecraft is too small.");
    } else {
        console.log("The spacecraft is too big.");
    }
}
spaceship(["3.5", "4", "5", "1.70"]);
spaceship(["4.5", "4.8", "5", "1.75"]);
spaceship(["3", "3", "4", "1.68"]);
