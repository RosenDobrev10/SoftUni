function stringSubstring(word, text) {
    let textArr = text.toLowerCase().split(" ");
    let wordLowerCase = word.toLowerCase();
    textArr.includes(wordLowerCase) ? console.log(word) : console.log(`${word} not found!`);
}
