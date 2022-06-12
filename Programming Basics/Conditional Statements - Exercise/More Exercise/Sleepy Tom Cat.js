function sleepyTomCat(input) {
    let vacation = Number(input[0]);
    let norm = 30000;
    let workDays = 365 - vacation;
    let playTime = workDays * 63 + vacation * 127;
    let diff = Math.abs(playTime - norm);
    let hours = Math.floor(diff / 60);
    let minutes = diff % 60;

    if (playTime > norm) {
        console.log("Tom will run away");
        console.log(`${hours} hours and ${minutes} minutes more for play`);
    } else {
        console.log("Tom sleeps well");
        console.log(`${hours} hours and ${minutes} minutes less for play`);
    }
}
sleepyTomCat(["113"]);
