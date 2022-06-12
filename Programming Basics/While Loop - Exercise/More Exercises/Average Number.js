function averageNumber(input) {
    let index = 0;
    let number = Number(input[index++]);
    let sum = 0;

    for (let i = 0; i < number; i++) {
        let currentNum = Number(input[index++]);
        sum += currentNum;
    }
    console.log((sum / number).toFixed(2));
}
averageNumber(["4", "3", "2", "4", "2"]);
