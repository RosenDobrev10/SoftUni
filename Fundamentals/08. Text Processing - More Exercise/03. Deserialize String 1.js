function deserializeString(arr) {
    let result = [];
    while (arr[0] !== 'end') {
        let [letter, indexes] = arr.shift().split(":");
        indexes = indexes.split("/").map(Number);
        indexes.forEach(index => result[index] = letter);
    }
    console.log(result.join(""));
}
