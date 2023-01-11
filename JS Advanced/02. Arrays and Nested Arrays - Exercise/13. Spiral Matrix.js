function spiralMatrix(row, col) {

    let result = [];
    for (let i = 0; i < row; i++) {
        result.push([]);
    }

    let startCol = 0;
    let endCol = col - 1;
    let startRow = 0;
    let endRow = row - 1;
    let counter = 1;
    while (startCol <= endCol && startRow <= endRow) {
        
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter;
            counter++;
        }
        startRow++;

        for (let i = startRow; i <= endRow; i++) {
            result[i][endCol] = counter;
            counter++;
        }
        endCol--;

        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter;
            counter++;
        }
        endRow--;

        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter;
            counter++;
        }
        startCol++;
    }

    result.forEach((row) => console.log(row.join(" ")));
}
spiralMatrix(5, 5)
spiralMatrix(3, 3)
