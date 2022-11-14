function revealWords(words, text) {
    let wordsArr = words.split(", ");
    while (text.includes("*")) {
        let word = wordsArr.shift();
        text = text.replace("*".repeat(word.length), word);
    }
    console.log(text);
}
