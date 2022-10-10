function lastKNumbersSequence(n, k) {
    let result = [1];
    for (let i = 1; i < n; i++) {
        result.push(result.slice(-k).reduce((a, b) => a + b));
    }
    console.log(result.join(" "));
}
