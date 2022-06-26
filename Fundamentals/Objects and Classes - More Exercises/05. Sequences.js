function sequences(input) {

    input = input.map(el => JSON.parse(el));        // Минаваме и парсваме всеки елемент от масива към обект
    input.forEach(el => el.sort((a, b) => b - a));  // Подреждаме всеки елемент от масива по низходящ ред 
    let outputArr = [];                             // Правим масив, в който ще пазим уникалните масиви 

    for (let i = 0; i < input.length; i++) {        // Минаваме по масивите ни 
        let currentArray = input[i];                // Взимаме текущия масив 
        let isUnique = true;                        // По начало е уникален 

        for (let j = 0; j < outputArr.length; j++) {    // Взимаме масив от запазените ни уникални 
            let nextArray = outputArr[j];               // Взимаме масив от уникалните 
            if (nextArray.toString() === currentArray.toString()) { // Ако текущия масив и запазения вече като уникален са еднакви 
                isUnique = false;                                   // Ако намерим еднакви масиви 
                break;                                              // Прекъсваме 
            }
        }

        if (isUnique) {                                             // Ако след минаването на сравняването 
            outputArr.push(currentArray);                           // го добавяме като уникален 
        }
    }

    outputArr.sort((a, b) => a.length - b.length);                  // Уникалния масив го сортираме по дължина 
    outputArr.forEach(el => console.log(`[${el.join(', ')}]`));     // Отпечатваме всеки масив на нов ред разделени по интервал и запетая 
}
sequences([
"[-3, -2, -1, 0, 1, 2, 3, 4]",
"[10, 1, -17, 0, 2, 13]",
"[4, -3, 3, -2, 2, -1, 1, 0]"])

// sequences([
// "[7.14, 7.180, 7.339, 80.099]",
// "[7.339, 80.0990, 7.140000, 7.18]",
// "[7.339, 7.180, 7.14, 80.099]"])