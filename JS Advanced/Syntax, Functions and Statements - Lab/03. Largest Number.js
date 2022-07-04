function largestNumber(numOne, numTwo, numThree) {
    
    let max = numOne;
    if (numOne < numTwo) {
        max = numTwo;
    }
    if (numTwo < numThree) {
        max = numThree;
    }
    console.log(`The largest number is ${max}.`);
}
largestNumber(5, -3, 16);
largestNumber(-3, -5, -22.5);
