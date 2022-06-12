function sumFirstAndLastArrayElements(input) {
    let firstNumber = input[0];                // индекс от 0 вади първия елемент от масива 
    let lastNumber = input[input.length - 1];  // индекс от input.length - 1 ни изважда последния елемент от масива
    let sum = firstNumber + lastNumber;
    console.log(sum);
}
sumFirstAndLastArrayElements([20, 30, 40]);
sumFirstAndLastArrayElements([10, 17, 22, 33]);
sumFirstAndLastArrayElements([11, 58, 69]);
