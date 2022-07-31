function specialNumbers(number) {
    
    for (let j = 1; j <= number; j++) {
        let jToString = String(j);
        let sum = 0;
        for (let i = 0; i < jToString.length; i++) {
            sum += Number(jToString[i]);
        }
        let isSpecial = false;
        if (sum === 5 || sum === 7 || sum === 11) {
            isSpecial = true;
        }
        if (isSpecial) {
            console.log(`${j} -> True`);
        } else {
            console.log(`${j} -> False`);
        }
    }
}
specialNumbers(15);
specialNumbers(20);
