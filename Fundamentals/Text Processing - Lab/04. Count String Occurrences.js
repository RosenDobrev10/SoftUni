function countStringOccurrences(text, word) {
    let arr = text.split(" ");          // Правим текста на масив, за да обходим по всичките му елементи
    let count = 0;                      // Правим брояч за това колко пъти я има думата

    for (let element of arr) {          // Минаваме по елементите от масива
        if (element === word) {         // Ако елемента от масива е същия като думата, която търсим
            count++;                    // Увеличаваме брояча
        }
    }
    console.log(count);
}
countStringOccurrences("This is a word and it also is a sentence", "is");
countStringOccurrences(
    "softuni is great place for learning new programming languages",
    "softuni"
);
