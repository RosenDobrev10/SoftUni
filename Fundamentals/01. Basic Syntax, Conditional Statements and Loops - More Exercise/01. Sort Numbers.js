function sortNumbers(firstNumber, secondNumber, thirdNumber){
    
    let biggest = 0
    let bigger = 0
    let big = 0
    
    if (firstNumber >= secondNumber && secondNumber >= thirdNumber){
        biggest = firstNumber
        bigger = secondNumber
        big = thirdNumber
    } else if (firstNumber >= thirdNumber && thirdNumber >= secondNumber){
        biggest = firstNumber
        bigger = thirdNumber
        big = secondNumber
    } else if (secondNumber >= firstNumber && firstNumber >= thirdNumber){
        biggest = secondNumber
        bigger = firstNumber
        big = thirdNumber
    } else if (secondNumber >= thirdNumber && thirdNumber >= firstNumber){
        biggest = secondNumber
        bigger = thirdNumber
        big = firstNumber
    } else if (thirdNumber >= secondNumber && secondNumber >= firstNumber){  
        biggest = thirdNumber
        bigger = secondNumber
        big = firstNumber
    } else if (thirdNumber >= firstNumber && firstNumber >= secondNumber){  
        biggest = thirdNumber
        bigger = firstNumber
        big = secondNumber
    }
   console.log(biggest)
   console.log(bigger)
   console.log(big)
}
sortNumbers(0,0,3)
