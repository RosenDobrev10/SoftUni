function moving(input) {
    let index = 0;
    let width = Number(input[index++]);
    let lenght = Number(input[index++]);
    let height = Number(input[index++]);
    let cubicSpace = width * lenght * height;
    let command = input[index++];

    while (command !== "Done") {
        let box = Number(command);
        cubicSpace -= box;
        if (cubicSpace <= 0) {
            break;
        }
        command = input[index++];
    }
    if (cubicSpace <= 0) {
        console.log(`No more free space! You need ${Math.abs(cubicSpace)} Cubic meters more.`);
    } else {
        console.log(`${cubicSpace} Cubic meters left.`);
    }
}
moving(["10", "10", "2", "20", "20", "20", "20", "122"]);
