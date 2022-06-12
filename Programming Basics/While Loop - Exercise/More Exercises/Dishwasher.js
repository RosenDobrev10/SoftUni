function dishwasher(input) {
    let index = 0;
    let bottles = Number(input[index++]);
    let command = input[index++];
    let quantity = bottles * 750;
    let times = 1;
    let plates = 0;
    let tendjeras = 0;
    let isEnough = true;

    while (command !== "End") {
        number = Number(command);
        if (times % 3 === 0) {
            wash = number * 15;
        } else {
            wash = number * 5;
        }
        if (quantity >= wash) {
            quantity -= wash;
            if (times % 3 === 0) {
                tendjeras += number;
            } else {
                plates += number;
            }
            times++;
        } else {
            isEnough = false;
            break;
        }
        command = input[index++];
    }
    if (isEnough) {
        console.log("Detergent was enough!");
        console.log(`${plates} dishes and ${tendjeras} pots were washed.`);
        console.log(`Leftover detergent ${quantity} ml.`);
    } else {
        let neededPreparat = Math.abs(quantity - wash);
        console.log(`Not enough detergent, ${neededPreparat} ml. more necessary!`);
    }
}
dishwasher(["2", "53", "65", "55", "End"]);
