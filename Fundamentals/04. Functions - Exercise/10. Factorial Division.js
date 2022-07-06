function factorialDivision(numOne, numTwo) {
    let sumOne = 1;
    for (let i = 1; i <= numOne; i++) {
        sumOne *= i;
    }
    let sumTwo = 1;
    for (let i = 1; i <= numTwo; i++) {
        sumTwo *= i;
    }
    let result = (sumOne / sumTwo).toFixed(2);
    console.log(result);
}
factorialDivision(5, 2);
factorialDivision(6, 2);
    