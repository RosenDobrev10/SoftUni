function smallestTwoNumbers(arr) {
    arr.sort((a, b) => a - b);
    console.log(`${arr[0]} ${arr[1]}`);
}
