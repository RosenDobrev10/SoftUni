function printAndSum(start, end) {
    
    let sum = 0;
    let printLine = "";
    for (let i = start; i <= end; i++) {
        printLine += i + " ";
        sum += i;
    }
    console.log(printLine);
    console.log(`Sum: ${sum}`);
}
printAndSum(5, 10);
printAndSum(0, 26);
printAndSum(50, 60);
