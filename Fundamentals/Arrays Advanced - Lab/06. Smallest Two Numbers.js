function smallestTwoNumbers(array){
    let sorted = array.sort((a,b) => a-b)   // sort((a,b) => a-b - Подрежда числата по нарастващ ред 
    let firstTwoNumbers = sorted.slice(0, 2)    // Взимаме първите две числа със slice(0, 2 )
    console.log(firstTwoNumbers.join(" "))

    /*
    array => array.sort((a, b) => a - b).slice(0, 2).join(" ")  Решение с arrow function със chain-ване 
    */

}
smallestTwoNumbers([30, 15, 50, 5])
//smallestTwoNumbers([3, 0, 10, 4, 7, 3])