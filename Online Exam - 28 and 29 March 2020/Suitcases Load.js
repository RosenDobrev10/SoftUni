function suitcasesLoad(input) {
    let index = 0;
    let capacity = Number(input[index++]);
    let command = input[index++];
    let suitcases = 0;
    let freeSpace = true;

    while (command !== "End") {
        let volume = Number(command);
        if ((suitcases + 1) % 3 === 0) {
            volume *= 1.1;
        }
        if (capacity < volume) {
            freeSpace = false;
            break;
        }
        capacity -= volume;
        suitcases++;
        command = input[index++];
    }
    if (freeSpace) {
        console.log("Congratulations! All suitcases are loaded!");
    } else {
        console.log("No more space!");
    }
    console.log(`Statistic: ${suitcases} suitcases loaded.`);
}
suitcasesLoad(["550", "100", "252", "72", "End"]);
