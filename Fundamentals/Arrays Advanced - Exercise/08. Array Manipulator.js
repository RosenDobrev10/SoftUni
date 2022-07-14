function arrayManipulator(arrayNumbers, arrayStrings){

    arrayStrings.toString().split(",")      // Преобразуваме масива в стринг, за да можем да го разделим по символ ,
    let index = 0                           // Създаваме си променлива индекс, по която ще минаваме по стринга с команди
    let command = arrayStrings[index++]     // Взимаме първата команда 

    while (command !== 'print'){            // Докато не дойде команда print, изпълняваме команди 

        let currentCommand = command.split(" ") // Настоящата ни команда я разделяме на отделни елементи 
        let toDo = currentCommand[0]            // Първия елемент е самата команда 
        let indexOfCommand = Number(currentCommand[1])  // Индекса, по който трябва да извършим командата 
        let element = Number(currentCommand[2])         // Елемента, с който трябва да извършим командата 

        switch(toDo){       // Проверяваме каква команда ни е подадена 
            case "add": 
                arrayNumbers.splice(indexOfCommand, 0, element);    // Към масива с числа, добавяме на дадения индекс, дадения елемент 
                break;

            case "addMany":
                for (let j = 2; j < currentCommand.length; j++){    // Правим цикъл за елементите, които трябва да добавяме 
                    let nextElement = Number(currentCommand[j])     // Елемента го взимаме от командата на настоящия индекс от цикъла 
                    arrayNumbers.splice(indexOfCommand, 0, nextElement) // Добавяме на дадения ни индекс, настоящото число
                    indexOfCommand++                            // Увеличаваме индекса всеки път, за да се добавят поред 
                }
                break;

            case "contains":
                element = Number(currentCommand[1])     // Нямаме индекс в настоящата команда, а само елементи 
                let indexOfElement = arrayNumbers.indexOf(element)  // Проверяваме къде се намира, нашият елемент ако го има 
                console.log(indexOfElement)                     // и печатаме индекса, ако го има, ако не -1 
                break;

            case "remove":
                arrayNumbers.splice(indexOfCommand, 1)  // Премахваме един елемент от масива с числа, на дадения индекс 
                break;

            case "shift":
                for (let k = 0; k < indexOfCommand; k++){   // Правим цикъл, толкова пъти, колкото ни е дадена по индекс 
                    let shiftedElement = arrayNumbers.shift()   // Взимаме първия елемент 
                    arrayNumbers.push(shiftedElement)           // и го слагаме отзад 
                }
                break;

            case "sumPairs":
                arrayNumbersSum = []                // Правим празен масив, в който ще вкарваме сумите на числата 
                while (arrayNumbers.length > 0 ){   // Докато не свършат числата в масива, ги сумираме 
                    let sum = arrayNumbers[0] + arrayNumbers[1] // Сумата на числата ще е нулевия и първи индекс
                    if (arrayNumbers.length === 1){             // докато евентуално не остане само един елемент 
                        sum = arrayNumbers[0]                   // тогава сумата ще е само този елемент 
                    }
                    arrayNumbersSum.push(sum)                 // Добавяме към новия масив, сумата за всяка итерация 
                    arrayNumbers.splice(0,2)                  // двете сумирани числа ги изтриваме, за да не ги смятаме повече
                }
                arrayNumbers = arrayNumbersSum;             // след края на цикъла, когато числата свършат, си прехвърляме
                break;                                      // новия масив във стария, за да го изпечатаме накрая 

        }
        command = arrayStrings[index++]                 // Подменяме командата всеки път с нова такава 
    }
    console.log(`[ ${arrayNumbers.join(", ")} ]`)       // Отпечатваме го по следният начин 
}
//arrayManipulator([1, 2, 4, 5, 6, 7], ['add 1 8', 'contains 1', 'contains 3', 'print'])
//arrayManipulator([1, 2, 3, 4, 5], ['addMany 5 9 8 7 6 5', 'contains 15', 'remove 3','shift 1', 'print'])
arrayManipulator([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,], ["sumPairs", "sumPairs", "addMany 0 -1 -2 -3", "print"])