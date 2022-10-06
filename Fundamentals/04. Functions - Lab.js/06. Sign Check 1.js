function signCheck(num1, num2, num3) {
    let negativeNumbers = 0;
    num1 < 0 ? negativeNumbers++ : null;
    num2 < 0 ? negativeNumbers++ : null;
    num3 < 0 ? negativeNumbers++ : null;
    negativeNumbers === 2 || negativeNumbers === 0 ? console.log('Positive') : console.log('Negative');
}
