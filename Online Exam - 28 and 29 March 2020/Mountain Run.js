function mountainRun(input) {
    let record = Number(input[0]);
    let distance = Number(input[1]);
    let timeForOneMeter = Number(input[2]);

    let time = distance * timeForOneMeter + Math.floor(distance / 50) * 30;
    let diff = Math.abs(time - record);
    if (time >= record) {
        console.log(`No! He was ${diff.toFixed(2)} seconds slower.`);
    } else {
        console.log(`Yes! The new record is ${time.toFixed(2)} seconds.`);
    }
}
mountainRun(["10164", "1400", "25"]);
