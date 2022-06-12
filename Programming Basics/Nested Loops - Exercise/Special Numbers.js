function specialNumbers(input) {
    let number = Number(input[0]);
    let specialNumber = "";

    for (let a = 1; a <= 9; a++) {
        for (let b = 1; b <= 9; b++) {
            for (let c = 1; c <= 9; c++) {
                for (let d = 1; d <= 9; d++) {
                    if (number % a === 0 && number % b === 0 && number % c === 0 && number % d === 0) {
                        specialNumber += `${a}${b}${c}${d} `;
                    }
                }
            }
        }
    }
    console.log(specialNumber);
}
specialNumbers(["3"]);
