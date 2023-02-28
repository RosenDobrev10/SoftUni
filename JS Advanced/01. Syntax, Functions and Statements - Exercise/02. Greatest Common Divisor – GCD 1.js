function greatesCommonDivisor(num1, num2) {
    let min = Math.min(num1, num2);
    for (let i = min; i >= 1; i--) {
        if (num1 % i === 0 && num2 % i === 0) {
            console.log(i);
            break;
        }
    }
}
