function diagonalSums(matrix) {
    let mainDiagonal = 0;
    let secDiagonal = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (col === row) {
                mainDiagonal += matrix[row][col];
            }
        }
        secDiagonal += matrix[row][matrix.length - 1 - row];
    }
    console.log(`${mainDiagonal} ${secDiagonal}`);
}
