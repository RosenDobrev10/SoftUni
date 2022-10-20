function counterStrike(arr) {
    let energy = Number(arr.shift());
    let count = 0;
    while (arr[0] !== "End of battle") {
        let distance = Number(arr.shift());
        if (energy >= distance) {
            energy -= distance;
            count++;
            count % 3 === 0 ? energy += count : null;
        } else {
            return console.log(`Not enough energy! Game ends with ${count} won battles and ${energy} energy`);
        }
    }
    console.log(`Won battles: ${count}. Energy left: ${energy}`);
}
