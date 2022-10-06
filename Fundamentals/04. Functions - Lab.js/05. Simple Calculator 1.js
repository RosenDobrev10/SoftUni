(num1, num2, operator) => {
    if (operator === "multiply") {
        return num1 * num2;
    } else if (operator === "divide") {
        return num1 / num2;
    } else if (operator === "add") {
        return num1 + num2;
    } else if (operator === "subtract") {
        return num1 - num2;
    }
};
