function nonDecreasingSubset(array) {
    let output = [];                        // Правим празен масив, в който да трупаме числата
    let max = Number.MIN_SAFE_INTEGER;      // Правим максималното число да е малко, за да е правилно още първия път
    for (let index = 0; index < array.length; index++) {    // Правим цикъл, който да обходи всички елементи в масива
        let currentElement = Number(array[index]);  // Настоящият ни елемент
        if (currentElement >= max) {        // Ако настоящият ни елемент е по-голям или равен на максималния
            max = currentElement;           // максималния ни е равен на настоящия 
            output.push(currentElement);    // и го слагаме в масива 
        }
    }
    console.log(output.join(" "));
}
nonDecreasingSubset([1, 3, 8, 4, 10, 12, 3, 2, 24]);
nonDecreasingSubset([1, 2, 3, 4]);
nonDecreasingSubset([20, 3, 2, 15, 6, 1]);
