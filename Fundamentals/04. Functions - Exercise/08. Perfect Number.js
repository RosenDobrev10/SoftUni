function perfectNumber(number) {
    let sum = 1;
    for (let i = 2; i < number; i++) {
        number % i === 0 ? sum += i : null;
    }
    sum === number ? console.log("We have a perfect number!") : console.log("It's not so perfect.");
}
perfectNumber(6);
//perfectNumber(28)
//perfectNumber(1236498)
