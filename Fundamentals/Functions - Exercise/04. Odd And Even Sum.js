function oddAndEvenSum(number) {

    let numberAsString = number.toString(); 
    let oddSum = 0;
    let evenSum = 0;

    for (let i = 0; i < numberAsString.length; i++) {
        let currentIndex = Number(number[i]);
        if (currentIndex % 2 === 0) {
            evenSum += currentIndex;
        } else {
            oddSum += currentIndex;
        }
    }
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}
oddAndEvenSum(1000435);
oddAndEvenSum(3495892137259234);
