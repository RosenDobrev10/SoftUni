function luckyNumbers(input) {
    let index = 0;
    let n = Number(input[index++]);
    let buff = "";

    for (let a = 1; a <= 9; a++) {
        for (let b = 1; b <= 9; b++) {
            for (let c = 1; c <= 9; c++) {
                for (let d = 1; d <= 9; d++) {
                    if (a + b === c + d) {
                        if (n % (a + b) === 0) {
                            buff += `${a}${b}${c}${d} `;
                        }
                    }
                }
            }
        }
    }
    console.log(buff);
}
luckyNumbers(["7"]);
