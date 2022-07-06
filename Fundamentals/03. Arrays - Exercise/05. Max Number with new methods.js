function maxNumber(array){
    let newArray = []
    while(array.length > 0){            // Правим цикъл, докато свършат елементите от масива.
        let current = array.shift()     // Взимаме текущия елемент и го махаме от масива за последващи действия 
        let biggest = Math.max(...array) // Math.max = намира най-големия по стойност елемент от масив
                                        // ... = Търси по всички изброени елементи от масива 
        if ( current > biggest){
            newArray.push(current)
        }
    }
    console.log(newArray.join(" "))
}
maxNumber([1, 4, 3, 2])
maxNumber([14, 24, 3, 19, 15, 17])
maxNumber([41, 41, 34, 20])
maxNumber([27, 19, 42, 2, 13, 45, 48])