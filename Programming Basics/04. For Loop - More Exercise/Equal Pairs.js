function equalPairs(input) {
    let index = 0;
    let n = Number(input[index++]);
    let maxdiff = 0;
    let lastPair = 0;

    for (let i = 0; i < n; i++) {
        let firstNum = Number(input[index++]);
        let secondNum = Number(input[index++]);
        let currentPair = firstNum + secondNum;
        if (i > 0) {
            let diff = Math.abs(currentPair - lastPair);
            if (diff > maxdiff) {
                maxdiff = diff;
            }
        }
        lastPair = currentPair;
    }

    if (maxdiff === 0) {
        console.log(`Yes, value=${lastPair}`);
    } else {
        console.log(`No, maxdiff=${maxdiff}`);
    }
}
equalPairs(["2", "-1", "0", "0", "-1"]);
