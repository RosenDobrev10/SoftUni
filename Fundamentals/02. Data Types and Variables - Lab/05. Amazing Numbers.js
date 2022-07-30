function amazingNumbers(number) {
    
    let numberToString = String(number);
    let sum = 0;
    for (let i = 0; i < numberToString.length; i++) {
        sum += Number(numberToString[i]);
    }
    let isAmazing = false;
    let sumToString = String(sum);
    for (let j = 0; j < sumToString.length; j++) {
        if (sumToString[j] === "9") {
            isAmazing = true;
            break;
        }
    }
    if (isAmazing) {
        console.log(`${number} Amazing? True`);
    } else {
        console.log(`${number} Amazing? False`);
    }
}
amazingNumbers(1233);
amazingNumbers(999);
