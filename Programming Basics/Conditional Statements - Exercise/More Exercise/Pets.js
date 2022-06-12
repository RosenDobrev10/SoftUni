function Pets(input) {
    let days = Number(input[0]);
    let allFood = Number(input[1]);
    let foodPerDayDog = Number(input[2]);
    let foodPerDayCat = Number(input[3]);
    let foodPerDayTurtle = Number(input[4]) / 1000;

    let eatenFood = foodPerDayDog * days + foodPerDayCat * days + foodPerDayTurtle * days;
    let diff = Math.abs(eatenFood - allFood);
    if (eatenFood <= allFood) {
        console.log(`${Math.floor(diff)} kilos of food left.`);
    } else {
        console.log(`${Math.ceil(diff)} more kilos of food are needed.`);
    }
}
Pets(["2", "10", "1", "1", "1200"]);
