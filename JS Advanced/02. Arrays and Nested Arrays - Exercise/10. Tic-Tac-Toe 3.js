function ticTacToe(arr) {
    let firstPlayer = 'X';
    let secondPlayer = 'O';

    let firstTurn = true;
    let secondTurn = false;

    let dashboard = [
        ['false', 'false', 'false'],
        ['false', 'false', 'false'],
        ['false', 'false', 'false'],
    ];
    const gameWin = (dashboard) => {
        const length = dashboard.length;
        let isWin = false;

        if (
            dashboard[0][0] === dashboard[0][1] &&
            dashboard[0][0] === dashboard[0][2] &&
            dashboard[0][0] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[0][0] === dashboard[1][0] &&
            dashboard[0][0] === dashboard[2][0] &&
            dashboard[0][0] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[1][0] === dashboard[1][1] &&
            dashboard[1][0] === dashboard[1][2] &&
            dashboard[1][0] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[2][0] === dashboard[2][1] &&
            dashboard[2][0] === dashboard[2][2] &&
            dashboard[2][0] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[0][1] === dashboard[1][1] &&
            dashboard[0][1] === dashboard[2][1] &&
            dashboard[0][1] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[0][2] === dashboard[1][2] &&
            dashboard[0][2] === dashboard[2][2] &&
            dashboard[0][2] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[0][0] === dashboard[1][1] &&
            dashboard[0][0] === dashboard[2][2] &&
            dashboard[0][0] !== 'false'
        )
            isWin = true;
        else if (
            dashboard[2][0] === dashboard[1][1] &&
            dashboard[2][0] === dashboard[0][2] &&
            dashboard[2][0] !== 'false'
        )
            isWin = true;

        return isWin;
    };

    const gameEnd = (dashboard) => {
        let length = dashboard.length;
        let isEnd = true;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (dashboard[i][j] === 'false') isEnd = false;
            }
        }
        return isEnd;
    };

    const alreadyTakenPlace = (row, column, dashboard) => {
        if (dashboard[row][column] !== 'false') return true;
        else return false;
    };

    const printMatrix = (dashboard) => {
        for (let i of dashboard) {
            let buffer = '';
            for (let j of i) {
                buffer += j + '\t';
            }
            console.log(buffer);
        }
    };

    while (arr[0] !== undefined) {
        let [row, column] = arr.shift().split(' ').map(Number);

        if (alreadyTakenPlace(row, column, dashboard)) {
            console.log('This place is already taken. Please choose another!');
            continue;
        }

        if (firstTurn) {
            dashboard[row][column] = firstPlayer;
            firstTurn = false;
            secondTurn = true;
        } else if (secondTurn) {
            dashboard[row][column] = secondPlayer;
            firstTurn = true;
            secondTurn = false;
        }

        if (gameWin(dashboard)) {
            firstTurn
                ? console.log(`Player ${secondPlayer} wins!`)
                : console.log(`Player ${firstPlayer} wins!`);
            printMatrix(dashboard);
            break;
        }

        if (gameEnd(dashboard)) {
            console.log('The game ended! Nobody wins :(');
            printMatrix(dashboard);
            break;
        }
    }
}
