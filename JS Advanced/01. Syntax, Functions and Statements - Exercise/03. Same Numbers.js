function sameNumbers(num) {

    let isSame = true;
    let sum = 0;
    num = String(num);
    let firstDigit = num[0];

    for (let i = 0; i < num.length; i++) {
        sum += Number(num[i]);
    }

    for (let i = 1; i < num.length; i++) {
        let currentDigit = num[i];
        if (firstDigit !== currentDigit) {
            isSame = false;
            break;
        }
    }

    console.log(isSame);
    console.log(sum);
}
sameNumbers(2222222);
sameNumbers(1234);
