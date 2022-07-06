function addAndRemoveElements(array) {

    let result = []
    array.map((command, number) => command === "add" ? result.push(++number) : result.pop());
    result.length === 0 ? console.log("Empty") : console.log(result.join("\n"));
}
addAndRemoveElements(["add", "add", "add", "add"]);
addAndRemoveElements(["add", "add", "remove", "add", "add"]);
addAndRemoveElements(["remove", "remove", "remove"]);
