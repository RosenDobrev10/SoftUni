function processOddNumbers(array) {
    
    let output = [];
    for (let i = 0; i < array.length; i++) {
        if (i % 2 !== 0) {
            output.push(Number(array[i]) * 2);
        }
    }
    console.log(output.reverse().join(" "));
}
processOddNumbers([10, 15, 20, 25]);
//processOddNumbers([3, 0, 10, 4, 7, 3])
