function maxNumber(input) {
    let index = 0;
    let currentInput = input[index++];
    let maxNumber = Number.MIN_SAFE_INTEGER;

    while (currentInput !== "Stop") {
        let currentNumber = Number(currentInput);
        if (currentNumber > maxNumber) {
            maxNumber = currentNumber;
        }
        currentInput = input[index++];
    }
    console.log(maxNumber);
}
maxNumber(["100", "99", "80", "70", "Stop"]);
