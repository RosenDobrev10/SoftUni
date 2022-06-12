function gameOfIntervals(input) {
    let index = 0;
    let moves = Number(input[index++]);
    let result = 0;
    let from0to9 = 0;
    let from10to19 = 0;
    let from20to29 = 0;
    let from30to39 = 0;
    let from40to50 = 0;
    let invalidNumbers = 0;

    for (let i = 0; i < moves; i++) {
        let currentNumber = Number(input[index++]);
        if (currentNumber < 0 || currentNumber > 50) {
            result /= 2;
            invalidNumbers++;
        } else if (currentNumber < 10) {
            result += 0.2 * currentNumber;
            from0to9++;
        } else if (currentNumber < 20) {
            result += 0.3 * currentNumber;
            from10to19++;
        } else if (currentNumber < 30) {
            result += 0.4 * currentNumber;
            from20to29++;
        } else if (currentNumber < 40) {
            result += 50;
            from30to39++;
        } else {
            result += 100;
            from40to50++;
        }
    }
    console.log(`${result.toFixed(2)}`);
    console.log(`From 0 to 9: ${((from0to9 / moves) * 100).toFixed(2)}%`);
    console.log(`From 10 to 19: ${((from10to19 / moves) * 100).toFixed(2)}%`);
    console.log(`From 20 to 29: ${((from20to29 / moves) * 100).toFixed(2)}%`);
    console.log(`From 30 to 39: ${((from30to39 / moves) * 100).toFixed(2)}%`);
    console.log(`From 40 to 50: ${((from40to50 / moves) * 100).toFixed(2)}%`);
    console.log(`Invalid numbers: ${((invalidNumbers / moves) * 100).toFixed(2)}%`);
}
gameOfIntervals(["10","43","57","-12","23","12","0","50","40","30","20",]);
