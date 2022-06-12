function pipesInPool(input) {
    let Volume = Number(input[0]);
    let pipe1 = Number(input[1]);
    let pipe2 = Number(input[2]);
    let hours = Number(input[3]);

    let volumePipe1 = pipe1 * hours;
    let volumePipe2 = pipe2 * hours;
    let allVolumePipes = volumePipe1 + volumePipe2;
    let fillPercent = (allVolumePipes / Volume) * 100;
    let fillPercentPipe1 = (volumePipe1 / allVolumePipes) * 100;
    let fillPercentPipe2 = (volumePipe2 / allVolumePipes) * 100;

    if (allVolumePipes <= Volume) {
        console.log(`The pool is ${fillPercent}% full. Pipe 1: ${fillPercentPipe1.toFixed(2)}%. Pipe 2: ${fillPercentPipe2.toFixed(2)}%.`);
    } else {
        let overflow = Math.abs(allVolumePipes - Volume);
        console.log(`For ${hours} hours the pool overflows with ${overflow.toFixed(2)} liters.`);
    }
}
pipesInPool(["100", "100", "100", "2.5"]);
