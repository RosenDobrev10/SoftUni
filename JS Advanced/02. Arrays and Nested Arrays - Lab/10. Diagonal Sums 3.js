function diagonalSums(matrix) {
    let mainDiagonal = 0;
    let secondaryDiagonal = 0;
    for (let i = 0; i < matrix.length; i++) {
        mainDiagonal += matrix[i][i];
        secondaryDiagonal += matrix[i][matrix.length - i - 1];
    }
    console.log(`${mainDiagonal} ${secondaryDiagonal}`);
}
