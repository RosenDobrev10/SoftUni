function darts(input) {
    let index = 0;
    let player = input[index++];
    let target = 301;
    let command = input[index++];
    let successfulShot = 0;
    let unsuccessfulShot = 0;

    while (command !== "Retire") {
        shot = command;
        let points = Number(input[index++]);
        if (shot === "Single") {
            points = points;
            if (points <= target) {
                target -= points;
                successfulShot++;
            } else {
                unsuccessfulShot++;
            }
        } else if (shot === "Double") {
            points = points * 2;
            if (points <= target) {
                target -= points;
                successfulShot++;
            } else {
                unsuccessfulShot++;
            }
        } else if (shot === "Triple") {
            points = points * 3;
            if (points <= target) {
                target -= points;
                successfulShot++;
            } else {
                unsuccessfulShot++;
            }
        }
        if (target === 0) {
            console.log(`${player} won the leg with ${successfulShot} shots.`);
            break;
        }
        command = input[index++];
    }
    if (command === "Retire") {
        console.log(`${player} retired after ${unsuccessfulShot} unsuccessful shots.`);
    }
}
darts([
    "Rob Cross",
    "Triple",
    "20",
    "Triple",
    "20",
    "Triple",
    "20",
    "Triple",
    "20",
    "Double",
    "20",
    "Triple",
    "20",
    "Double",
    "5",
    "Triple",
    "10",
    "Double",
    "6",
    "Retire",
]);
