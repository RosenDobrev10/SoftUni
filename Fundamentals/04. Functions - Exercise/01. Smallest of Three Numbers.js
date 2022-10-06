function smallestOfThreeNumbers(numOne, numTwo, numThree){
    let min = Number.MAX_SAFE_INTEGER   // Правим си число, което е много голямо
    if (numOne < min){                  // Първото число, винаги ще е по-малко от min
        min = numOne                    // Присвояваме стойността на първото число на минималното 
    }
    if (numTwo < min){                  // Ако второто число е по-малко от минималното
        min = numTwo                    // Второто число става минимално 
    }
    if (numThree < min){                // ако третото число е по-малко от минималното
        min = numThree                  // Третото число става минимално 
    }
    console.log(min)
}
smallestOfThreeNumbers(2,5,3)
smallestOfThreeNumbers(600,342,123)
smallestOfThreeNumbers(25,21,4)
smallestOfThreeNumbers(2,2,2)
