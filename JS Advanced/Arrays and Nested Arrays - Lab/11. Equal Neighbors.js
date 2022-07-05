function equalNeighbors(matrix) {

    let counter = 0;

    for (let col = 0; col < matrix[0].length; col++) {
        for (let row = 0; row < matrix.length - 1; row++) {
            let element = matrix[row][col];
            let nextElement = matrix[row + 1][col];
            if (element === nextElement) {
                counter++;
            }
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length - 1; col++) {
            let element = matrix[row][col];
            let nextElement = matrix[row][col + 1];
            if (element === nextElement) {
                counter++;
            }
        }
    }
    console.log(counter);
}
equalNeighbors([
    ["2", "3", "4", "7", "0"],

    ["4", "0", "5", "3", "4"],

    ["2", "3", "5", "4", "2"],

    ["9", "8", "7", "5", "4"],
]);
