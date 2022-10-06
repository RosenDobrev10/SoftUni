function addAndSubtract(num1, num2, num3) {
    let sum = (a, b) => a + b;
    let subtract = (a, b) => a - b;
    console.log(subtract(sum(num1, num2), num3));
}
