function addAndSubtract(numOne, numTwo, numThree){
    let sum = (numOne, numTwo) => numOne + numTwo     // Правим променлива, която е функция и взима за параметри numOne
                                                    // , numTwo. Тя изчислява колко е сбора им
    let subtract = (sum,numThree) => sum(numOne,numTwo) - numThree  // Правим променлива, която е функция и взима за
                                                        // параметри, резултата от сумата и третото число. Тя
                                                        // изчислява колко е разликата от функцията sum и третото число 
    console.log(subtract(sum,numThree))             // печатаме като извикваме функцията subtract с параметри 
}
addAndSubtract(23,6,10)
addAndSubtract(1,17,30)
addAndSubtract(42,58, 100)