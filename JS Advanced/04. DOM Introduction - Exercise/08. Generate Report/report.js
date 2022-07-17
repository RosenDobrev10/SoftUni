function generateReport() {

    let inputElements = Array.from(document.getElementsByTagName('input'));
    let tableRows = Array.from(document.getElementsByTagName('tr'));
    
    const resultArr = [];
    const checkedCols = [];
 
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const obj = {};
 
        for (let y = 0; y < row.children.length; y++) {
            const element = row.children[y];
            if (i === 0) {
                if (element.children[0].checked) {
                    checkedCols.push(y);
                }
                continue;
            }
 
            if (checkedCols.includes(y)) {
                let propertyName = inputElements[y].name;
                obj[propertyName] = element.textContent;
            }
        }
        if (i !== 0) {
            resultArr.push(obj);
        }
    }
    
    document.getElementById('output').value = JSON.stringify(resultArr);
}