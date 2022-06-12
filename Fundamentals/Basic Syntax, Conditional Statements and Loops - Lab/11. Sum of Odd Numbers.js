function sumOffOddNumbers(number) {
    let counter = 0;
    let sum = 0;
    for (let i = 1; i <= 100; i += 2) {
        console.log(i);
        sum += i;
        counter++;
        if (counter === number) {
            break;
        }
    }
    console.log(`Sum: ${sum}`);
}
sumOffOddNumbers(5);
