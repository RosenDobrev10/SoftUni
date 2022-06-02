function movieDay(input) {
    let timeShooting = Number(input[0]);
    let scenes = Number(input[1]);
    let timeForScene = Number(input[2]);
    let allTime = scenes * timeForScene + timeShooting * 0.15;
    let diff = Math.abs(timeShooting - allTime);
    if (timeShooting >= allTime) {
        console.log(`You managed to finish the movie on time! You have ${Math.round(diff)} minutes left!`);
    } else {
        console.log(`Time is up! To complete the movie you need ${Math.round(diff)} minutes.`);
    }
}
movieDay(["60", "15", "3"]);
