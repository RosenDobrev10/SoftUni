function perfectNumber(number) {
    let perfectNumber = 0;

    for (let i = 1; i < number; i++) {
        if (number % i === 0) {
            perfectNumber += i;
        }
    }

    perfectNumber === number ? console.log("We have a perfect number!") : console.log("It's not so perfect.");
    
}
perfectNumber(6);
//perfectNumber(28)
//perfectNumber(1236498)
