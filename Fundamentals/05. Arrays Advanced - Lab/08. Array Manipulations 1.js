function arrayManipulations(array) {
    let arr = array.shift().split(" ").map(Number);
    for (let line of array) {
        let [command, param1, param2] = line.split(" ");
        param1 = Number(param1);
        command === 'Add' ? arr.push(param1) : null;
        command === 'Remove' ? arr = arr.filter(num => num !== param1) : null;
        command === 'RemoveAt' ? arr.splice(param1, 1) : null;
        command === 'Insert' ? arr.splice(Number(param2), 0, param1) : null;
    }
    console.log(arr.join(" "));
}
