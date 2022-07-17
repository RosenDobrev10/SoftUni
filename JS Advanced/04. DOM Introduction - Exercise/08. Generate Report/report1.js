function generateReport() {

    let output = document.querySelector("#output");
    let boxes = document.querySelectorAll("thead tr th input");
    let info = document.querySelectorAll("tbody tr");

    let result = [];

    for (let i = 0; i < info.length; i++) {
        let report = {};

        for (let j = 0; j < boxes.length; j++) {
            if (boxes[j].checked) {
                report[boxes[j].name] = info[i].children[j].textContent;
            }
        }

        result.push(report);
    }
    
    output.textContent = JSON.stringify(result);
}
