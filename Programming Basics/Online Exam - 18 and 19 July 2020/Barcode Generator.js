function barcodeGenerator(input) {
    let firstNumber = Number(input[0]);
    let secondNumber = Number(input[1]);
    let buff = "";

    firstStart = Math.floor(firstNumber / 1000);
    secondStart = Math.floor((firstNumber / 100) % 10);
    thirdStart = Math.floor((firstNumber / 10) % 10);
    fourthStart = firstNumber % 10;

    firstEnd = Math.floor(secondNumber / 1000);
    secondEnd = Math.floor((secondNumber / 100) % 10);
    thirdEnd = Math.floor((secondNumber / 10) % 10);
    fourthEnd = secondNumber % 10;

    for (let a = firstStart; a <= firstEnd; a++) {
        for (let b = secondStart; b <= secondEnd; b++) {
            for (let c = thirdStart; c <= thirdEnd; c++) {
                for (let d = fourthStart; d <= fourthEnd; d++) {
                    if (a % 2 !== 0 && b % 2 !== 0 && c % 2 !== 0 && d % 2 !== 0) {
                        buff += `${a}${b}${c}${d} `;
                    }
                }
            }
        }
    }

    console.log(buff);
}
barcodeGenerator(["2345", "6789"]) 

