function maxNumber(array){
    let newArray = []
    for ( let i = 0; i < array.length; i++){    // Правим цикъл, който да вземе елемент и да го сравнява с останалите от масива.
        let currentElement = array[i]       
        isTopInteger = true                     // Приемаме първоначално, че е най-голямото число

        for (let j = i + 1; j < array.length; j++){ // Правим вложен цикъл, за да проверяваме числото от първия цикъл със
            let nextElement = array[j]              // следващото число от цикъла 
            if (currentElement <= nextElement){    // Ако първото число е по-малко или равно, значи не е най-голямото.
                isTopInteger = false                // отбелязваме, че това число не е най-голямото
                break;                              // и прекъсваме вътрешния цикъл
            }
        }

        if (isTopInteger){      // след края на вътрешния цикъл проверяваме дали взетото число от първия масив е най-голямото
            newArray.push(currentElement)   // Ако е най-голямото го добавяме към новият ни масив 
        }
    }

    console.log(newArray.join(" ")) // получените числа в новия масив ги съединяваме със сепаратор и ги отпечатваме 
}
maxNumber([1, 4, 3, 2])
maxNumber([14, 24, 3, 19, 15, 17])
maxNumber([41, 41, 34, 20])
maxNumber([27, 19, 42, 2, 13, 45, 48])