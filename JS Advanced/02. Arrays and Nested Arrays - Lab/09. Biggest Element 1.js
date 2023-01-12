function biggestElement(matrix) {
    let max = Math.max(...matrix[0]);
    for (let row = 1; row < matrix.length; row++) {
        let rowMax = Math.max(...matrix[row]);
        if (rowMax >= max) {
            max = rowMax;
        }
    }
    return max;
}
