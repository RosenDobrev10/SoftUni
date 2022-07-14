function printNthElement(arr) {
    let output = [];                // Създаваме празен масив, в който да пазим резултата
    let step = Number(arr.pop());   // Взимаме последния елемент от масива и го преобразуваме на число 
    for (let index = 0; index < arr.length; index += step) {    // Правим цикъл от началото до края на изрязания ни вече масив 
                                                                // като стъпката ни е толкова колкото сме изрязали от масива 
        output.push(arr[index]);                        // Добавяме към масива индекса, до които сме стигнали 
    }
    console.log(output.join(" "));                  // Отпечатваме резултата с разстояние между тях 
}
printNthElement(["5", "20", "31", "4", "20", "2"]);
printNthElement(["dsa", "asd", "test", "test", "2"]);
printNthElement(["1", "2", "3", "4", "5", "6"]);
