function addAndRemoveElements(array) {

    let number = 1;
    let result = [];

    for (const command of array) {
        if (command === "add") {
            result.push(number);
        } else if (command === "remove") {
            result.pop();
        }
        number++;
    }
    
    if (result.length === 0) {
        console.log("Empty");
    } else {
        console.log(result.join("\n"));
    }
}
addAndRemoveElements(["add", "add", "add", "add"]);
addAndRemoveElements(["add", "add", "remove", "add", "add"]);
addAndRemoveElements(["remove", "remove", "remove"]);
