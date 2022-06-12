function worldSwimmingRecord(input) {
    let recordSeconds = Number(input[0]);
    let distanceMeters = Number(input[1]);
    let timeSecondsForMeter = Number(input[2]);
    let slowdown = Math.floor(distanceMeters / 15) * 12.5;
    let finalTime = distanceMeters * timeSecondsForMeter + slowdown;
    let diff = Math.abs(recordSeconds - finalTime);

    if (finalTime < recordSeconds) {
        console.log( `Yes, he succeeded! The new world record is ${finalTime.toFixed(2)} seconds.`);
    } else {
        console.log(`No, he failed! He was ${diff.toFixed(2)} seconds slower. `);
    }
}
worldSwimmingRecord(["55555.67", "3017", "5.03"]);
