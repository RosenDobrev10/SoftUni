function oddAndEvenSum(number) {
    let numberAsString = String(number);
    let oddSum = 0;
    let evenSum = 0;
    for (let i = 0; i < numberAsString.length; i++) {
        let currentNum = Number(numberAsString[i]);
        currentNum % 2 === 0 ? evenSum += currentNum : oddSum += currentNum;
    }
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}
oddAndEvenSum(1000435);
oddAndEvenSum(3495892137259234);
