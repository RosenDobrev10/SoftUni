function diagonalAttack(matrix) {
    matrix = matrix.map(row => row.split(' ').map(Number));
    let sumFirstDiagonal = 0;
    let sumSecondDiagonal = 0;
    for (let i = 0; i < matrix.length; i++) {
        sumFirstDiagonal += matrix[i][i];
        sumSecondDiagonal += matrix[i][matrix.length - 1 - i];
    }
    if (sumFirstDiagonal === sumSecondDiagonal) {
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (i !== k && i !== matrix.length - 1 - k) {
                    matrix[i][k] = sumFirstDiagonal;
                }
            }
        }
    }
    matrix.forEach(row => console.log(row.join(" ")));
}
