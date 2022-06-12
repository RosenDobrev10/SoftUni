function deerOfSanta(input) {
    let days = Number(input[0]);
    let leftFood = Number(input[1]);
    let food1 = Number(input[2]);
    let food2 = Number(input[3]);
    let food3 = Number(input[4]);

    let allFood = days * (food1 + food2 + food3);

    if (leftFood >= allFood) {
        console.log(`${Math.floor(leftFood - allFood)} kilos of food left.`);
    } else {
        console.log(`${Math.ceil(allFood - leftFood)} more kilos of food are needed.`);
    }
}
deerOfSanta(["2", "10", "1", "1", "2"]);
