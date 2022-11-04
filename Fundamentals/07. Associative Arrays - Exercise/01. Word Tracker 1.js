function wordTracker(arr) {
    let words = {};
    let wordsToFind = arr.shift().split(" ");
    wordsToFind.forEach((word) => (words[word] = 0));
    arr.forEach((word) => {words[word] !== undefined ? words[word]++ : null;});
    let sorted = Object.entries(words).sort((a, b) => b[1] - a[1]);
    for (let [word, count] of sorted) {
        console.log(`${word} - ${count}`);
    }
}
