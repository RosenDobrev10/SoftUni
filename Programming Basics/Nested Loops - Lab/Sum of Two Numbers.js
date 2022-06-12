function sumOfTwoNumbers(input) {
    let start = Number(input[0]);
    let finish = Number(input[1]);
    let magicNumber = Number(input[2]);
    let combinations = 0;

    for (let i = start; i <= finish; i++) {
        for (let j = start; j <= finish; j++) {
            combinations++;
            if (i + j === magicNumber) {
                console.log(`Combination N:${combinations} (${i} + ${j} = ${magicNumber})`);
                return;
            }
        }
    }
    console.log(`${combinations} combinations - neither equals ${magicNumber}`);
}
sumOfTwoNumbers(["88", "888", "2000"]);
