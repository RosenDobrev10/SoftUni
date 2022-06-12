function uniquePinCodes(input) {
    let index = 0;
    let firstNum = Number(input[index++]);
    let secondNum = Number(input[index++]);
    let thirdNum = Number(input[index++]);

    for (let a = 2; a <= firstNum; a += 2) {
        for (let b = 1; b <= secondNum; b++) {
            if (b === 2 || b === 3 || b === 5 || b === 7) {
                for (let c = 2; c <= thirdNum; c += 2) {
                    console.log(`${a} ${b} ${c}`);
                }
            }
        }
    }
}
uniquePinCodes(["3", "5", "5"]);
