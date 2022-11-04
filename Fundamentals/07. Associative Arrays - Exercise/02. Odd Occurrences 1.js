function oddOccurrences(arr) {
    let words = {};
    arr = arr.split(" ").map((word) => word.toLowerCase());
    arr.forEach((word) => {
        words[word] === undefined ? (words[word] = 1) : words[word]++;
    });
    let filtered = Object.entries(words).filter((entry) => entry[1] % 2 !== 0);
    let result = "";
    for (let [key, count] of filtered) {
        result += key + " ";
    }
    console.log(result);
}
