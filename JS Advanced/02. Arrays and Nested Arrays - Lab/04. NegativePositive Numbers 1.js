function negativePositiveNumbers(arr) {
    const result = [];
    arr.forEach(num => num < 0 ? result.unshift(num) : result.push(num));
    console.log(result.join("\n"));
}
