function arrayManipulations(array) {
    let arr = array.shift().split(" ").map(Number); // Взимаме първия елемент от масива. разделяме го по разстояние да станат
                                                    // отделни елементи и ги преобразуваме към числа
    for (let i = 0; i < array.length; i++) {        // правим цикъл, който да обходи останалата част от масива 
        let currentCommand = array[i].split(" ");   // Взимаме командата и я разделяме по разстояние 
        let command = currentCommand[0];            // Първата част от командата е самата команда 
        let firstNum = Number(currentCommand[1]);   // Втората част е число, с което да извършим командата
        let secondNum = Number(currentCommand[2]);  // Третата част, също е число.
        switch (command) {
            case "Add": arr.push(firstNum); break;  // Добавяме даденото число от командата към масива в края 
            case "Remove": arr = arr.filter((el) => el !== firstNum); break;    // Филтрираме масива като останат само числата различни от даденото ни число 
            case "RemoveAt": arr.splice(firstNum, 1); break;    // Изтриваме числото на даден индекс 
            case "Insert": arr.splice(secondNum, 0, firstNum); break;   // Добавяме число на даден индекс 
        }
    }
    console.log(arr.join(" "));
}
arrayManipulations([
    "4 19 2 53 6 43",
    "Add 3",
    "Remove 2",
    "RemoveAt 1",
    "Insert 8 3",
]);
