function evenPositionElement(n, k) {
    const result = [1];
    for (let i = 1; i < n; i++) {
        result.push(result.slice(-k).reduce((a, b) => a + b, 0));
    }
    return result;
}
