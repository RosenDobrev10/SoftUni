function censoredWords(text, word) {

    while (text.includes(word)) {                               // Докато в текста се съдържа думата
        text = text.replace(word, "*".repeat(word.length));     // Новият текст е равен на заменения
        // Заменяме, думата с *, толкова пъти, колкото е дълга самата дума
    }
    console.log(text);
}
//censoredWords('A small sentence with some words','small')
censoredWords("Find the hidden word", "hidden");
