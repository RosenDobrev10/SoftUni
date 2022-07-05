function biggestElement(matrix) {

    let max = Number.MIN_SAFE_INTEGER;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const element = matrix[row][col];
            if (max <= element) {
                max = element;
            }
        }
    }
    return max;
}
biggestElement([
[20, 50, 10],
[8, 33, 145]])

biggestElement([
    [3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4],
]);
