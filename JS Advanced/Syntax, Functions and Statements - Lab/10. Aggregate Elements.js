function aggregateElements(arr) {

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log(sum);


    let sumInverse = 0;
    for (let i = 0; i < arr.length; i++) {
        sumInverse += 1 / arr[i];
    }
    console.log(sumInverse);

    
    let sumConcat = "";
    for (let i = 0; i < arr.length; i++) {
        sumConcat += arr[i];
    }
    console.log(sumConcat);
}
aggregateElements([1, 2, 3]);
aggregateElements([2, 4, 8, 16]);
