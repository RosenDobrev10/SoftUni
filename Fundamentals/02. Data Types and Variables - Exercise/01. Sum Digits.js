function sumDigits(number) {
    
    let numbearAsString = String(number);               // Превръщаме числото в стринг.
    let sum = 0;                                                                                     
    for (let i = 0; i < numbearAsString.length; i++) {  // Обхождаме го чрез цикъла.
        sum += Number(numbearAsString[i]);              // Прибавяме всяка цифра към сумата
    }
    console.log(sum);
}
sumDigits(245678);
sumDigits(97561);
sumDigits(543);
