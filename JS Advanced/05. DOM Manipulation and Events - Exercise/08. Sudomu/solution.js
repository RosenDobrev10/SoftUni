function solve() {

    let inputs = document.querySelectorAll('input');
    const checkBtn = document.querySelectorAll('button')[0];
    const clear = document.querySelectorAll('button')[1];

    const table = document.querySelector('table');
    const checkPar = document.querySelectorAll('#check p')[0];

    clear.addEventListener('click', reset);
    checkBtn.addEventListener('click', checkResult);

    function reset() {
        Array.from(inputs).forEach(input => (input.value = ''));
        table.style.border = 'none';
        checkPar.textContent = '';
    }

    function checkResult() {
        let matrix = [
            [inputs[0].value, inputs[1].value, inputs[2].value],
            [inputs[3].value, inputs[4].value, inputs[5].value],
            [inputs[6].value, inputs[7].value, inputs[8].value]
        ];

        isSudomu = true;
        for (let i = 1; i < matrix.length; i++) {
            let row = matrix[i];
            let col = matrix.map(row => row[i]);
            if (col.length != [...new Set(col)].length || row.length != [...new Set(row)].length) {
                isSudomu = false;
                break;
            }
        }

        if (isSudomu) {
            table.style.border = '2px solid green';
            checkPar.style.color = 'green';
            checkPar.textContent = 'You solve it! Congratulations!';
        } else {
            table.style.border = '2px solid red';
            checkPar.style.color = 'red';
            checkPar.textContent = 'NOP! You are not done yet...';
        }
    }
}