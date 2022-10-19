function theLift(arr) {
    let people = Number(arr.shift());
    let lift = arr.shift().split(" ").map(Number);
    const maxCapacity = 4;
    let isFull = false;

    for (let i = 0; i < lift.length; i++) {
        if (people >= maxCapacity - lift[i]) {
            people -= maxCapacity - lift[i];
            lift[i] = maxCapacity;
        } else {
            lift[i] += people;
            people = 0;
        }
    }
    isFull = lift.every((wagon) => wagon === maxCapacity);
    if (people === 0 && !isFull) {
        console.log("The lift has empty spots!");
    } else if (people > 0 && isFull) {
        console.log(`There isn't enough space! ${people} people in a queue!`);
    }
    console.log(lift.join(" "));
}
