function factorialDivision(num1, num2) {
    function factorial(num) {
        let sum = 1;
        for (let i = 2; i <= num; i++) {
            sum *= i;
        }
        return sum;
    }
    console.log((factorial(num1) / factorial(num2)).toFixed(2));
}
