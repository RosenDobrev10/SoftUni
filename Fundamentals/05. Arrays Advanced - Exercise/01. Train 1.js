function train(array) {
    let train = array.shift().split(" ").map(Number);
    let maxCapacity = Number(array.shift());
    for (let line of array) {
        let [param1, param2] = line.split(" ");
        if (param1 === "Add") {
            train.push(param2);
        } else {
            for (let i = 0; i < train.length; i++) {
                if (train[i] + Number(param1) <= maxCapacity) {
                    train[i] += Number(param1);
                    break;
                }
            }
        }
    }
    console.log(train.join(" "));
}
