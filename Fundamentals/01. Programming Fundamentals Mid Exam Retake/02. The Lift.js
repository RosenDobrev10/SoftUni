function theLift(input) {

    let peopleInQueue = Number(input.shift());
    let wagons = input.toString().split(" ").map(Number);
 
    for (let i = 0; i < wagons.length; i++) {
        if (wagons[i] < 4) {
            if (peopleInQueue >= 4 - wagons[i]) {
                peopleInQueue -= 4 - wagons[i];
                wagons[i] = 4;
            } else {
                wagons[i] += peopleInQueue;
                peopleInQueue = 0;
            }
        }
    }
 
    let isNotFull = false;
 
    for (let i = 0; i < wagons.length; i++) {
 
        if (wagons[i] < 4) {
            isNotFull = true;
        }
    }
 
    if (!isNotFull && peopleInQueue > 0) {
        console.log(`There isn't enough space! ${peopleInQueue} people in a queue!`); 
    }
 
    if (isNotFull && peopleInQueue == 0) {
        console.log("The lift has empty spots!");
    }
 
    console.log(wagons.join(" "));
}
theLift(["15", "0 0 0 0"])
//theLift(["20", "0 2 0"])