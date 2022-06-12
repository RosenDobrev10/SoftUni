function cake(input) {
    let index = 0;
    let width = Number(input[index++]);
    let lenght = Number(input[index++]);
    let cakeSize = width * lenght;
    let command = input[index++];

    while (command !== "STOP") {
        let pieces = Number(command);
        cakeSize -= pieces;
        if (cakeSize <= 0) {
            break;
        }
        command = input[index++];
    }
    if (cakeSize <= 0) {
        console.log( `No more cake left! You need ${Math.abs(cakeSize)} pieces more.`);
    } else {
        console.log(`${cakeSize} pieces are left.`);
    }
}
cake(["10", "10", "20", "20", "20", "20", "21"]);
