function movingTarget(input) {

    let targets = input.shift().split(" ").map(Number)
    
    while (input[0] !== "End"){
        let currentCommand = input.shift().split(" ")
        let command = currentCommand[0]
        let index = Number(currentCommand[1])
        let value = Number(currentCommand[2])

        switch(command){
            case "Shoot":
                if (index >= 0 && index < targets.length) {
                    targets[index] -= value
                    if (targets[index] <= 0){
                        targets.splice(index, 1)
                    }
                }
                break;
            case "Add":
                if (index >= 0 && index < targets.length) {
                    targets.splice(index, 0, value)
                } else {
                    console.log("Invalid placement!")
                }
                break;
            case "Strike":
                if (index + value < targets.length && index - value >= 0){
                    targets.splice(index - value, value * 2 + 1)
                } else {
                    console.log("Strike missed!")
                }
                break;
        }
    }
    console.log(targets.join("|"))
}
//movingTarget([ "52 74 23 44 96 110", "Shoot 5 10", "Shoot 1 80", "Strike 2 1", "Add 22 3", "End",]);
movingTarget(["1 2 3 4 5", "Strike 0 1", "End"]);
