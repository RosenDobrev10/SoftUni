function equalArrays(array1, array2) {
    for (let i of array1) {
        i = Number(i);
    }

    for (let k of array2) {
        k = Number(k);
    }
    let isEqual = true;
    let sum = 0;
    for (let j = 0; j < array1.length; j++) {
        if (array1[j] === array2[j]) {
            sum += Number(array1[j]);
        } else {
            console.log(`Arrays are not identical. Found difference at ${j} index`);
            isEqual = false;
            break;
        }
    }
    if (isEqual) {
        console.log(`Arrays are identical. Sum: ${sum}`);
    }
}
equalArrays(["10", "20", "30"], ["10", "20", "30"]);
equalArrays(["1", "2", "3", "4", "5"], ["1", "2", "4", "4", "5"]);
equalArrays(["1"], ["10"]);
