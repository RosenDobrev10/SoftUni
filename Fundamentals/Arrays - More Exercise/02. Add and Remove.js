function addAndRemove(array) {
    let output = [];                            // Правим празен масив, в който пазим резултата 

    for (let index = 1; index <= array.length; index++) {   // Правим цикъл за числата започващи от 1 до дължината на масива 
        if (array[index - 1] === "add") {               // Ако първия ни елемент е add
            output.push(index);                         // Добавяме към масива, числото 
        } else {                                        // Ако не е remove 
            output.pop();                               // Махаме вече последния добавен елемент 
        }
    }
    if (output.length === 0) {              // Ако полученият ни масив няма елементи в него
        console.log("Empty");               // Печатаме, че е празен
    } else {                                // Ако в полученият масив има елементи
        console.log(output.join(" "));      // Печатаме елементите разделени с разстояние 
    }
}
addAndRemove(["add", "add", "add", "add"]);
addAndRemove(["add", "add", "remove", "add", "add"]);
addAndRemove(["remove", "remove", "remove"]);
