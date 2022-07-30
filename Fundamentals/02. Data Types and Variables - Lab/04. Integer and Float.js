function integerAndFloat(num1, num2, num3) {
    
    let sum = num1 + num2 + num3;
    let sumToString = String(sum) // String(num) и num.toString() - Преобразуват число в стринг 

    isFloat = false;

    for (let i = 0; i < sumToString.length; i++) {
        if (sumToString[i] === ".") {
            isFloat = true;
            break;
        }
    }
    if (isFloat) {
        console.log(`${sum} - Float`);
    } else {
        console.log(`${sum} - Integer`);
    }
}
integerAndFloat(9, 100, 1.1);
integerAndFloat(100, 200, 303);
