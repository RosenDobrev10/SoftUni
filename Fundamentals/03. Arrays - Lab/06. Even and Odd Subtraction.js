function evenAndOddSubtraction(array) {
    let sumOdd = 0;
    let sumEven = 0;
    for (let i of array) {
        if (i % 2 === 0) {
            sumEven += i;
        } else {
            sumOdd += i;
        }
    }
    console.log(sumEven - sumOdd);
}
evenAndOddSubtraction([1, 2, 3, 4, 5, 6]);
evenAndOddSubtraction([3, 5, 7, 9]);
evenAndOddSubtraction([2, 4, 6, 8, 10]);
