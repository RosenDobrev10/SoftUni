function cookingByNumbers(number,operation1,operation2,operation3,operation4,operation5) {

    number = Number(number);                                                        // Парсваме го към число
    let operations = [operation1, operation2, operation3, operation4, operation5]; // Създаваме масив, с всички команди

    for (let i = 0; i < operations.length; i++) {               // Минаваме по масива с операциите
        if (operations[i] === "chop") {                         // Ако командата е chop
            number /= 2;                                        // Делим числото на 2
        } else if (operations[i] === "dice") {                  // Ако командата е dice
            number = Math.sqrt(number);                         // Намираме корен квадратен на числото
        } else if (operations[i] === "spice") {                 // Ако командата е spice
            number++;                                           // добавяме 1 към числото
        } else if (operations[i] === "bake") {                  // Ако командата е bake
            number *= 3;                                        // Умножаваме числото по 3
        } else if (operations[i] === "fillet") {                // Ако командата е fillet
            number *= 0.8;                                      // Изваждаме от числото от 20 %
        }
        console.log(number);                                    // Печатаме числото
    }
}
cookingByNumbers("32", "chop", "chop", "chop", "chop", "chop");
cookingByNumbers("9", "dice", "spice", "chop", "bake", "fillet");
