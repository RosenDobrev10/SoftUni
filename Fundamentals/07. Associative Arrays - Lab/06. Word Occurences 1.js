function wordOccurences(arr) {
    let words = {};
    arr.forEach((word) => {
        words[word] === undefined ? (words[word] = 0) : null;
        words[word]++;
    });
    let sorted = Object.entries(words).sort((a, b) => b[1] - a[1]);
    for (let [word, count] of sorted) {
        console.log(`${word} -> ${count} times`);
    }
}
