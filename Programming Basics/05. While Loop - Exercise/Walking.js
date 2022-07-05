function walking(input) {
    let index = 0;
    let command = input[index++];
    let goal = 10000;
    let allSteps = 0;

    while (command !== "Going home") {
        let steps = Number(command);
        allSteps += steps;
        if (allSteps >= goal) {
            break;
        }
        command = input[index++];
    }

    if (command === "Going home") {
        let finalSteps = Number(input[index++]);
        allSteps += finalSteps;
    }
    let diff = Math.abs(allSteps - goal);
    if (allSteps < goal) {
        console.log(`${diff} more steps to reach goal.`);
    } else {
        console.log("Goal reached! Good job!");
        console.log(`${diff} steps over the goal!`);
    }
}
walking(["125", "250", "4000", "30", "2678", "4682"]);
