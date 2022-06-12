function minNumber(input) {
    let index = 0;
    let currentInput = input[index++];
    let minNumber = Number.MAX_SAFE_INTEGER;

    while (currentInput !== "Stop") {
        let currentNumber = Number(currentInput);
        if (currentNumber < minNumber) {
            minNumber = currentNumber;
        }
        currentInput = input[index++];
    }
    console.log(minNumber);
}
minNumber(["100", "99", "80", "70", "Stop"]);