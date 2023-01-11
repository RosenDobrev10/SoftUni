function mathOperations(num1, num2, operation) {
    let result;
    if (operation === '+') {
        result = num1 + num2;
    } else if (operation === '-') {
        result = num1 - num2;
    } else if (operation === '*') {
        result = num1 * num2;
    } else if (operation === '/') {
        result = num1 / num2;
    } else if (operation === '%') {
        result = num1 % num2;
    } else if (operation === '**') {
        result = num1 ** num2;
    }
    console.log(result);
}
