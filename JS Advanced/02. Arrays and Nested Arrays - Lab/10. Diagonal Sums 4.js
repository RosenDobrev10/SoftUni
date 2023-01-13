function diagonalSums(matrix) {
    let mainDiagonal = 0;
    let secondaryDiagonal = 0;
    matrix.forEach((row, i) => mainDiagonal += row[i])
    matrix.reverse()
    matrix.forEach((row, i) => secondaryDiagonal += row[i])
    console.log(`${mainDiagonal} ${secondaryDiagonal}`);
}
