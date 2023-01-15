function subSum(arr, start, end) {
    if (!Array.isArray(arr)) {
        return NaN;
    }
    start < 0 ? start = 0 : null;
    end > arr.length - 1 ? end = arr.length - 1 : null;
    return arr.slice(start, end + 1).map(Number).reduce((a, b) => a + b, 0);
}
