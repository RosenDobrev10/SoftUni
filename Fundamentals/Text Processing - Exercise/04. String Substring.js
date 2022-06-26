function stringSubstring(searchedWord, text) {

    searchedWord = searchedWord.toLocaleLowerCase();            // Променяме думата, която търсим да е с малки букви
    text = text.toLocaleLowerCase().split(" "); // Променяме думите в текста, да са с малки букви и го правим на масив

    for (let word of text) {                   // Минаваме по думите от текста
        if (word === searchedWord) {                   // Ако думата е равна на тази, която търсим
            return console.log(searchedWord);           // Връщаме, че сме намерили думата и прекъсваме търсенето
        }
    }
    console.log(`${searchedWord} not found!`);          // Ако след проверката на всички, думи не сме я намерили го отпечатваме
}
stringSubstring("javascript", "JavaScript is the best programming language");
stringSubstring("python", "JavaScript is the best programming language");
