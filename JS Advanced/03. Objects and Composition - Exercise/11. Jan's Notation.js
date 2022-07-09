function jansNotation(array){

    let numbers = [];        // Правим празен масив, в който събираме числата от масива 
    let operators = [];      // Правим празен масив, в който събираме операторите от масива

    for (let i = 0; i < array.length; i++){ // Правим цикъл, с който обикаляме по масива за числа и оператори

        let typeOfsymbol = typeof(array[i]) // търсим от какъв тип е първия елемент 
        if (typeOfsymbol === "number"){     // Ако типът е number 
            numbers.push(array[i]);          // го добавамя към масива с числа 
        } else {                            // Ако типът е string
            operators.push(array[i]);        // го добавамя към масива с оператори
        }

        if (numbers.length >= 2 && operators.length === 1){ // Ако в някакъв момент имаме 2 или повече числа и оператор
            while ( operators.length > 0){                  // Въртим цикъла, докато има оператори 
                let numberOne = numbers[numbers.length - 2] // Взимаме предпоследното число от масива с числа 
                let numberTwo = numbers[numbers.length - 1] // Взимаме последното число от масива с числа 
                let operator = operators[0]                 // Взимаме първия оператор от масива 

                let sum = 0                                 // Създаваме си променлива за аритметичната операция 
                switch(operator){                           // Проверяваме какъв е оператора 
                    case "+": sum = numberOne + numberTwo; break;
                    case "-": sum = numberOne - numberTwo; break;
                    case "*": sum = numberOne * numberTwo; break;
                    case "/": sum = numberOne / numberTwo; break;
                }
                numbers.splice(-2, 2)   // Махаме последните 2 числа от масива, с който сме извършвали аритметичната операция 
                operators.splice(0, 1)  // Махаме оператора, с който сме извършвали аритметичната операция 
                numbers.push(sum)       // На мястото на последните 2 числа, слагаме тяхната аритметична стойност 
            }
        }

    }

    if (numbers.length - operators.length > 1){     // Ако след добавянето на всичко имаме повече числа, отколкото оператори
        console.log("Error: too many operands!")    // Печатаме това съобщение 
        return                                      // Прекъсваме функцията 
    }

    if (operators.length - numbers.length >= 0){    // Ако след добавянето на всичко имаме повече оператори и недостатъчно числа 
        console.log("Error: not enough operands!")  // Печатаме това съобщение
        return                                      // Прекъсваме функцията
    }
        
    console.log(numbers.join(" "))                  // Печатаме състоянието на числата към дадения момент 
}
jansNotation([3, 4, '+'])
jansNotation([5, 3, 4, '*', '-'])
jansNotation([7, 33, 8, '-'])
jansNotation([15, '/'])
