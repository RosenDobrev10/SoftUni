function movingTarget(arr) {
    let targets = arr.shift().split(" ").map(Number);
    while (arr[0] !== "End") {
        let [command, param1, param2] = arr.shift().split(" ");
        param1 = Number(param1);
        param2 = Number(param2);
        if (command === "Shoot" && targets[param1] !== undefined) {
            targets[param1] -= param2;
            targets[param1] <= 0 ? targets.splice(param1, 1) : null;
        } else if (command === "Add") {
            targets[param1] === undefined ? console.log("Invalid placement!") : targets.splice(param1, 0, param2);
        } else if (command === "Strike") {
            targets[param1 - param2] === undefined || targets[param1 + param2] === undefined 
            ? console.log("Strike missed!") 
            : targets.splice(Math.max(param1 - param2, 0), param2 * 2 + 1);
        }
    }
    console.log(targets.join("|"));
}
