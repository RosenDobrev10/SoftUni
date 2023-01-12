function biggerHalf(arr) {
    arr.sort((a, b) => a - b);
    let result = arr.slice(-Math.ceil(arr.length / 2));
    return result;
}
