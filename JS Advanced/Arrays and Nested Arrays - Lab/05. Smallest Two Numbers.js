function smallestTwoNumbers(array) {

    const min1 = Math.min(...array);
    array.splice(array.indexOf(min1), 1);
    const min2 = Math.min(...array);
    console.log(`${min1} ${min2}`);
}
smallestTwoNumbers([30, 15, 50, 5]);
smallestTwoNumbers([3, 0, 10, 4, 7, 3]);
