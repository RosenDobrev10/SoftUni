function smallestTwonumbers(array) {
    let resultArray = [];
    for (let i = 0; i < 2; i++) {
        let smallestNumber = Math.min(...array);
        array.splice(array.indexOf(smallestNumber), 1);
        resultArray.push(smallestNumber);
    }
    console.log(resultArray.join(" "));
}
