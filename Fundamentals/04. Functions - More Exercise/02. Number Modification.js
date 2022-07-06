function numberModification(number){
    numberAsArray = number.toString().split("") // Правим числото на стринг и после на масив 
    let finalAverage = 0

    while (finalAverage <= 5){          // Докато средното аритметично е по-малко или равно на 5 въртим цикъла 

        let sum = 0
        for (let i of numberAsArray) {  // Чрез цикъла намираме сумата на всички елементи от масива 
            sum += Number(i)
        }

        finalAverage = sum / numberAsArray.length   // Делим получената сума на дължината на масива 
        if (finalAverage > 5){                      // Ако е по-голяма от 5 прекъсваме цикъла и не въртим повече
            break;
        } else {
            numberAsArray.push('9')             // Ако средното аритметично е по-малко, добавяме 9 в края на масива 
        }

    }
    console.log(numberAsArray.join(""))
}
numberModification(101)
//numberModification(5835)