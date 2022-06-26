function revealWords(string, sentence) {

    let words = string.split(", ");                 // Взимаме думите, които трябва да сложим в изречението

    while (sentence.includes("*")) {                // Цикъла ще се върти, докато заменим всички думи със звездички
        let word = words.shift();                   // Взимаме текущата дума от масива с думи
        sentence = sentence.replace("*".repeat(word.length), word);
        // Заменяме в изречението зведичките, които са дълги, колкото нашата дума със самата дума
    }

    console.log(sentence);
}
//revealWords('great', //'softuni is ***** place for learning new programming languages')
revealWords( "great, learning", "softuni is ***** place for ******** new programming languages");
