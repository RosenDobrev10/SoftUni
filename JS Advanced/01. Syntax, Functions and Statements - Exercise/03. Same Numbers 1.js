function sameNumbers(num) {
    let numString = num.toString();
    let isSame = true;
    for (let i = 1; i < numString.length; i++) {
        if (numString[0] !== numString[i]) {
            isSame = false
            break;
        }
    }
    let sum = numString.split("").map(Number).reduce((a, b) => a + b, 0);
    console.log(isSame);
    console.log(sum);
}
