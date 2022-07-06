function diagonalAttack(matrix) {

    matrix = matrix.map(row => row.split(' ').map(Number));

    let sumFirstDiagonal = 0;
    for (let i = 0; i < matrix.length; i++) {
        sumFirstDiagonal += matrix[i][i];
    }

    let sumSecondDiagonal = 0;
    for (let j = 0; j < matrix.length; j++) {
        sumSecondDiagonal += matrix[j][matrix.length - 1 - j];
    }

    if (sumFirstDiagonal === sumSecondDiagonal) {
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (i !== k && i !== matrix.length - 1 - k) {
                    matrix[i][k] = sumFirstDiagonal;
                }
            }
        }
        matrix.forEach(row => console.log(row.join(" ")));
    }
    else {
        matrix.forEach(row => console.log(row.join(" ")));
    }
}
// diagonalAttack([
//     '1 1 1',
//     '1 1 1',
//     '1 1 0'])

diagonalAttack([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'])