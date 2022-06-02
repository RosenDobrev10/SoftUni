function sumSeconds(input) {
    let playerOne = Number(input[0]);
    let playerTwo = Number(input[1]);
    let playerThree = Number(input[2]);

    let totalTime = playerOne + playerTwo + playerThree;
    let minutes = Math.floor(totalTime / 60); // Преобразуване от секунди в минути или минути в часове
    let seconds = totalTime % 60; // При процентно делене остатъка е секундите от минути или минутите от часове

    if (seconds < 10) {
        console.log(`${minutes}:0${seconds}`);
    } else {
        console.log(`${minutes}:${seconds}`);
    }
}
sumSeconds(["35", "45", "44"]);
