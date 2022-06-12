function oddEvenPosition(input) {
    let index = 0;
    let numbers = Number(input[index++]);
    let oddSum = 0;
    let evenSum = 0;
    let oddMin = Number.MAX_SAFE_INTEGER;
    let evenMin = Number.MAX_SAFE_INTEGER;
    let oddMax = Number.MIN_SAFE_INTEGER;
    let evenMax = Number.MIN_SAFE_INTEGER;
    for (let i = 1; i <= numbers; i++) {
        let currentNum = Number(input[index++]);
        if (i % 2 !== 0) {
            oddSum += currentNum;
            if (currentNum > oddMax) {
                oddMax = currentNum;
            }
            if (currentNum < oddMin) {
                oddMin = currentNum;
            }
        } else {
            evenSum += currentNum;
            if (currentNum > evenMax) {
                evenMax = currentNum;
            }
            if (currentNum < evenMin) {
                evenMin = currentNum;
            }
        }
    }
    console.log(`OddSum=${oddSum.toFixed(2)},`);
    if ( oddMin !== Number.MAX_SAFE_INTEGER){
    console.log(`OddMin=${oddMin.toFixed(2)},`);
    } else {
        console.log("OddMin=No,")
    }
    if (oddMax !== Number.MIN_SAFE_INTEGER){
    console.log(`OddMax=${oddMax.toFixed(2)},`);
    } else {
        console.log("OddMax=No,")
    }
    console.log(`EvenSum=${evenSum.toFixed(2)},`);
    if ( evenMin !== Number.MAX_SAFE_INTEGER){
    console.log(`EvenMin=${evenMin.toFixed(2)},`);
    } else {
        console.log("EvenMin=No,")
    }
    if (evenMax !== Number.MIN_SAFE_INTEGER ){
    console.log(`EvenMax=${evenMax.toFixed(2)}`);
    } else {
        console.log("EvenMax=No")
    }
}
oddEvenPosition(["6", "2", "3", "5", "4", "2", "1"]);
