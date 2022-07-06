function valueOfAString(input) {

    let [word, type] = input;                                               // Взимаме думата и типа от инпута 
    let sum = 0;                                                            // Правим брояч за сумата от буквите 

    for (let i = 0; i < word.length; i++) {                                 // Минаваме по всяка буква от думата 
        let currentLetter = word[i];                                        // Взимаме текущата буква 
        if (type === "LOWERCASE") {                                         // Ако типа ни е малки букви 
            if ( currentLetter.toLocaleLowerCase() === currentLetter ) {    // Проверяваме дали текущата буква е малка 
                if ( currentLetter.charCodeAt() >= 97 && currentLetter.charCodeAt() <= 122 ) {
                    // Проверяваме дали текущата буква е в диапазона на малките букви 
                    sum += currentLetter.charCodeAt();                      // Добавяме нейната стойност към сумата 
                }
            }
        } else if (type === "UPPERCASE") {                                  // Ако типа ни е ГОЛЕМИ букви
            if ( currentLetter.toLocaleUpperCase() === currentLetter ) {    // Проверяваме дали текущата буква е голяма 
                if ( currentLetter.charCodeAt() >= 65 && currentLetter.charCodeAt() <= 90 ) {
                    // Проверяваме дали текущата буква е в диапазона на големите букви 
                    sum += currentLetter.charCodeAt();                      // Добавяме нейната стойност към сумата
                }
            }
        }
    }

    console.log(`The total sum is: ${sum}`);        // Отпечатваме получената сума 
}
valueOfAString(["HelloFromMyAwesomePROGRAM", "LOWERCASE"]);
valueOfAString(["AC/DC", "UPPERCASE"]);
