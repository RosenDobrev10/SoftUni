function play(matrix) {
 
    let dashboard = 
    [[false, false, false],
    [false, false, false],
    [false, false, false]];
 
    let player = 'X';
    let hasWon = false;
 
 
    for (let i = 0; i < matrix.length; i++) {
        let line = matrix[i];
        let [row, col] = line.split(' ').map(num => (Number(num)));
 
 
        if (dashboard[row][col] === false) {
            dashboard[row][col] = player;
 
            if (ifWins(dashboard, player)) {
                hasWon = true;
                break;
            }
 
            player = player === 'X' ? 'O' : 'X';
        } else if (dashboard.every(row => row.every(el => el !== false))) {
            break;
        }
        else {
            console.log('This place is already taken. Please choose another!');
        }
    }
 
    if (hasWon) {
        console.log(`Player ${player} wins!`);
    } else {
        console.log('The game ended! Nobody wins :(');
    }
 
    printMatrix(dashboard);
 
    function ifWins(dashboard, player) {
        return checkFirstDiagonal(dashboard, player) ||
            checkSecondDiagonal(dashboard, player) ||
            checkCols(dashboard, player) ||
            checkRows(dashboard, player);
    };
 
    function checkFirstDiagonal(dashboard, player) {
        return dashboard[0][0] === player &&
            dashboard[1][1] === player
            && dashboard[2][2] === player;
    }
 
    function checkSecondDiagonal(dashboard, player) {
 
        return dashboard[2][0] === player
            && dashboard[1][1] === player
            && dashboard[0][2] === player;
    }
 
    function checkRows(dashboard, player) {
 
        return (dashboard[0][0] === player
            && dashboard[0][1] === player && dashboard[0][2] === player)
            || (dashboard[1][0] === player && dashboard[1][1] === player
                && dashboard[1][2] === player)
            || (dashboard[2][0] === player && dashboard[2][1] === player
                && dashboard[2][2] === player);
    }
 
    function checkCols(dashboard, player) {
        return (dashboard[0][0] === player &&
            dashboard[1][0] === player
            && dashboard[2][0] === player)
            || (dashboard[0][1] === player && dashboard[1][1] === player
                && dashboard[2][1] === player) ||
            (dashboard[0][2] === player && dashboard[1][2] === player
                && dashboard[2][2] === player);
    }
 
    function printMatrix(dashboard) {
        dashboard.forEach(row => {
            console.log(row.join('\t'));
        });
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