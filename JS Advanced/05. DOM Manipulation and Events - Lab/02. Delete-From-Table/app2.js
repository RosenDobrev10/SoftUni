function deleteFromTable() {
    const inputElement = document.querySelector('input');
    const rowsInTable = document.querySelectorAll('tbody tr td:nth-of-type(2)');
    const resultDiv = document.querySelector('#result');

    [...rowsInTable].forEach(row => {
        if (row.textContent.includes(inputElement.value)) {
            row.remove();
            resultDiv.textContent = 'Deleted';
        } else {
            resultDiv.textContent = 'Not found.';
        }
    });
}
