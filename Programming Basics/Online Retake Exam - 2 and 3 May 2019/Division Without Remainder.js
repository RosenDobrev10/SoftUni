function divisionWithoutRemainder(input) {
    let index = 0;
    let numbers = Number(input[index++]);
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;

    for (let i = 0; i < numbers; i++) {
        let currentNumber = Number(input[index++]);
        if (currentNumber % 2 === 0) {
            counter1++;
        }
        if (currentNumber % 3 === 0) {
            counter2++;
        }
        if (currentNumber % 4 === 0) {
            counter3++;
        }
    }
    let p1 = (counter1 / numbers) * 100;
    let p2 = (counter2 / numbers) * 100;
    let p3 = (counter3 / numbers) * 100;
    console.log(`${p1.toFixed(2)}%`);
    console.log(`${p2.toFixed(2)}%`);
    console.log(`${p3.toFixed(2)}%`);
}
divisionWithoutRemainder(["10","680","2","600","200","800","799","199","46","128","65",]);
