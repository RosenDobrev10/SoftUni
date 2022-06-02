function histogram(input) {
    let index = 0;
    let n = Number(input[index]);
    index++;

    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;
    let counter4 = 0;
    let counter5 = 0;

    for (let i = 0; i < n; i++) {
        let currentNumber = Number(input[index]);
        index++;
        if (currentNumber < 200) {
            counter1++;
        } else if (currentNumber < 400) {
            counter2++;
        } else if (currentNumber < 600) {
            counter3++;
        } else if (currentNumber < 800) {
            counter4++;
        } else if (currentNumber >= 800) {
            counter5++;
        }
    }
    let p1 = (counter1 / n) * 100;
    let p2 = (counter2 / n) * 100;
    let p3 = (counter3 / n) * 100;
    let p4 = (counter4 / n) * 100;
    let p5 = (counter5 / n) * 100;

    console.log(`${p1.toFixed(2)}%`);
    console.log(`${p2.toFixed(2)}%`);
    console.log(`${p3.toFixed(2)}%`);
    console.log(`${p4.toFixed(2)}%`);
    console.log(`${p5.toFixed(2)}%`);
}
histogram(["3", "1", "2", "999"]);
