function sumTable() {
    const sum = document.getElementById("sum");
    const rows = document.querySelectorAll("tr");
    let sumOfRows = 0;
    for (let i = 1; i < rows.length; i++){
        const price = rows[i].children[1].textContent;
        sumOfRows += Number(price);
    }
    sum.textContent = sumOfRows;
}
