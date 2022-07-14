function palindromeIntegers(array){

    function isPalindrome(number){  // Правим функция, която проверява подадено число дали е палиндром или не       
        let reversedNum = Number(number.toString().split("").reverse().join(""))
        // Самото число го превръщаме в стринг, сплитваме го да стане масив, обръщаме го и го събираме пак отново и го правим Number
        if (number === reversedNum){ // Проверяваме дали са еднакви 
            return true;            // Ако да връшаме към функцията isPalindrome true 
        } else {
            return false            // Ако не  връшаме към функцията isPalindrome false  
        }
    }

    for (let i = 0; i < array.length; i++) {    // Правим цикъл, който се върти по подадения масив
        let currentNum = array[i]               // Взимаме текущото число от масива 
        console.log(isPalindrome(currentNum))   // Подаваме числото към функцията isPalindrome и тя ни връща резултат 
        
    }
}
palindromeIntegers([123,323,421,121])
//palindromeIntegers([32,2,232,1010])