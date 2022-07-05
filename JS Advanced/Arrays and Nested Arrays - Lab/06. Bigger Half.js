function biggerHalf(array) {

    array.sort((a, b) => a - b);
    const result = array.slice(Math.floor(array.length / 2));
    return result;
}
biggerHalf([4, 7, 2, 5]);
biggerHalf([3, 19, 14, 7, 2, 19, 6]);
