function sumFirstAndLast(array){

    let first = Number(array.shift())   // shift = Взима първия елемент и го връща
    let last = Number(array.pop())      // pop = Взима последния елемент и го връща 
    console.log(first + last)
}
sumFirstAndLast(['20', '30', '40'])
sumFirstAndLast(['5', '10'])