function bombNumbers(arrayOne, arrayTwo){

    let specialBombNumber = arrayTwo.shift()    // Взимаме от втория масив първия елемент е нашето бомбено число
    let power = arrayTwo.shift()                // Взимаме от втория масив първия останал елемент е нашата сила 

    let indexOfBombNumber = arrayOne.indexOf(specialBombNumber) // Намираме индекса, на който се намира бомбеното число

    while (indexOfBombNumber !== - 1){      // Докато в нашият масив, намираме бомбено число ще взривяваме числа 
        let start = Math.max(0, indexOfBombNumber - power)  // Началото на нашият гърмеж, ще е по-голямото от 0 и индекса на бомбеното число - силата 
        let explosion = power * 2 + 1        // Числата, които ще премахнем са силата по 2(отляво и отдясно) + самото бомбено число 
        arrayOne.splice(start, explosion)   // Подаваме началото от масива за махане на числа и колко елемента махаме 
        indexOfBombNumber = arrayOne.indexOf(specialBombNumber) // Подменяме стойността на индекса, ако числото го има намираме новия индекс и продължаваме
    }

    let sum = arrayOne.reduce((a,b) => a + b, 0) // Събира първия и втория елемент, като започне от нулевия, докато свършат 
    console.log(sum)    
}
bombNumbers([1, 2, 2, 4, 2, 2, 2, 9],[4, 2])