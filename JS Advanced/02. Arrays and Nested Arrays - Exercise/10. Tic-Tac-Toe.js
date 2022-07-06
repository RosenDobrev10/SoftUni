function ticTacToe(input) {

    let dashboard = [[false, false, false],
                    [false, false, false],
                    [false, false, false]];

    let hasFreeFields = (matrix) => matrix.some((arr) => arr.some(value => value === false))
    let win = false;
    let player = 'X';

    for (let i = 0; i < input.length && hasFreeFields(dashboard); i++) {
        let [row, col] = input[i].split(' ').map(num => Number(num));

        if (!dashboard[row][col]) {
            dashboard[row][col] = player;

            if (checkForWinner(dashboard, player)) {
                win = true;
                break;
            }

            player = player === 'X' ? 'O' : 'X';
        } else {
            console.log("This place is already taken. Please choose another!");
        }

    }

    if (win) {
        console.log(`Player ${player} wins!`);
    } else {
        console.log("The game ended! Nobody wins :(");
    }
    dashboard.forEach(line => {
        console.log(line.join('\t'));
    });

    function checkForWinner(currentBoard, sign) {
        let isWinner = false;
        
        for (let i = 0; i < 3; i++) {
            if (currentBoard[i][0] === sign && currentBoard[i][1] === sign && currentBoard[i][2] === sign) {
                isWinner = true;
                break;
            }
            if (currentBoard[0][i] === sign && currentBoard[1][i] === sign && currentBoard[2][i] === sign) {
                isWinner = true;
                break;
            }
        }
        if (!isWinner) {
            if ((currentBoard[0][0] === sign && currentBoard[1][1] === sign && currentBoard[2][2] === sign) ||
                (currentBoard[2][0] === sign && currentBoard[1][1] === sign && currentBoard[0][2] === sign)) {
                isWinner = true;
            }
        }
        return isWinner;
    }
}
ticTacToe([
"0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 1",
"1 2",
"2 2",
"2 1",
"0 0"])

ticTacToe([
"0 0", 
"0 0", 
"1 1", 
"0 1", 
"1 2", 
"0 2", 
"2 2", 
"1 2", 
"2 2", 
"2 1"])

ticTacToe([
"0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"])