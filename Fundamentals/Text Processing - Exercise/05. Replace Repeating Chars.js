function replaceRepeatingChars(string) {

    let uniqueChars = "";                           // Правим празен стринг, в който ще слагаме буквите, които не се повтарят

    for (let i = 0; i < string.length; i++) {       // Минаваме по всяка буква от стринга
        let currentChar = string[i];                // Взимаме текущата буква
        let nextChar = string[i + 1];               // Взимаме следващата буква

        if (currentChar !== nextChar) {             // Сравняваме дали двете букви са различни 
            uniqueChars += currentChar;             // Ако са различни, добавяме текущата буква към нашият стринг 
        }
    }

    console.log(uniqueChars);
}
//replaceRepeatingChars('aaaaabbbbbcdddeeeedssaa')
replaceRepeatingChars("qqqwerqwecccwd");
