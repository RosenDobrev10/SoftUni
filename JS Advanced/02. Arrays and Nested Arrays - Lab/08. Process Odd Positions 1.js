function processOddPositions(array) {

    return array
        .filter((element, index) => index % 2 !== 0)
        .map(element => element * 2)
        .reverse()  
        .join(" ")
}
processOddPositions([10, 15, 20, 25]);
processOddPositions([3, 0, 10, 4, 7, 3]);
