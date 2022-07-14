function negativeOrPositiveNumbers(array) {
    let output = [];    // Правим празен масив, в който да добавяме взетите елементи от настоящия масив 

    for (let i of array) {      // Правим forof цикъл, защото самите индекси не ни касаят, а само техните стойности 
        let element = Number(i)     // Преобразуваме елемента да е число, а не стринг
        if (element < 0) {          // Ако елемента е по-малък от 0 
            output.unshift(element);    // го слагаме в началото на масива 
        } else {                        // Ако елемента е по-малък от 0
            output.push(element);       // го слагаме в края на масива
        }
    }

    for (let print of output){          // Отпечатваме всички получени числа от новия масив с forof цикъл.
        console.log(print)
    }
}
negativeOrPositiveNumbers(["7", "-2", "8", "9"]);
//negativeOrPositiveNumbers(['3', '-2', '0', '-1'])
