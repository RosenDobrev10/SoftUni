function cutAndReverse(string) {
    let firstHalf = string.substring(0, string.length / 2);
    let secondHalf = string.substring(string.length / 2);
    console.log(firstHalf.split("").reverse().join(""));
    console.log(secondHalf.split("").reverse().join(""));
}
