function asciiSumator(arr) {
    let sum = 0;
    let [start, end, string] = arr;
    let min = Math.min(start.charCodeAt(), end.charCodeAt());
    let max = Math.max(start.charCodeAt(), end.charCodeAt());
    for (let char of string) {
        char.charCodeAt() > min && char.charCodeAt() < max ? sum += char.charCodeAt() : null;
    }
    console.log(sum);
}
