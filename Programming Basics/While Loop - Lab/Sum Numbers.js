function sumNumbers(input) {
    let index = 0;
    let targetSum = Number(input[index++]);
    let sum = 0;

    while (sum < targetSum) {
        let currentNumber = Number(input[index++]);
        sum += currentNumber;
    }
    console.log(sum);
}
sumNumbers(["100", "10", "20", "30", "40"]);
