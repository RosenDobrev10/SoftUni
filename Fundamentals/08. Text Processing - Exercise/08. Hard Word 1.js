function hardWords(arr) {
    let [text, words] = arr;
    words.sort((a, b) => b.length - a.length);
    for (let word of words) {
        text = text.replace(("_").repeat(word.length), word);
    }
    console.log(text);
}
