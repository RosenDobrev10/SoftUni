function lunchBreak(input) {
    let nameSerial = input[0];
    let durationEpisode = Number(input[1]);
    let durationLunchBreak = Number(input[2]);

    let timeLunch = (durationLunchBreak * 1) / 8;
    let timeRelax = (durationLunchBreak * 1) / 4;
    if (durationLunchBreak >= durationEpisode + timeLunch + timeRelax) {
        let freeTime = durationLunchBreak - (durationEpisode + timeLunch + timeRelax);
        console.log(`You have enough time to watch ${nameSerial} and left with ${Math.ceil(freeTime)} minutes free time.`);
    } else {
        let neededTime = Math.abs(durationLunchBreak - (durationEpisode + timeLunch + timeRelax));
        console.log(`You don't have enough time to watch ${nameSerial}, you need ${Math.ceil(neededTime)} more minutes.`);
    }
}
lunchBreak(["Game of Thrones", "60", "96"]);
