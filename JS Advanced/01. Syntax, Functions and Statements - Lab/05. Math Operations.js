function mathOperations(numOne, numTwo, operand) {

    let result = 0;
    
    if (operand === "+") {
        result = numOne + numTwo;
    } else if (operand === "-") {
        result = numOne - numTwo;
    } else if (operand === "*") {
        result = numOne * numTwo;
    } else if (operand === "/") {
        result = numOne / numTwo;
    } else if (operand === "%") {
        result = numOne % numTwo;
    } else if (operand === "**") {
        result = numOne ** numTwo;
    }
    console.log(result);
}
mathOperations(5, 6, "+");
mathOperations(3, 5.5, "*");
