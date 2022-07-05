function diagonalSums(matrix) {

    let mainDiagonal = 0;
    let secondaryDiagonal = 0;
    let firstIndex = 0;
    let lastIndex = matrix[0].length - 1;

    matrix.forEach(array => {
        mainDiagonal += array[firstIndex++]
        secondaryDiagonal += array[lastIndex--]
    })

    console.log(`${mainDiagonal} ${secondaryDiagonal}`);
}
diagonalSums([
    [20, 40],
    [10, 60],
]);

diagonalSums([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89],
]);
