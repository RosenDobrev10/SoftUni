function sortingNumber(array) {
    
    let result = [];
    let newArray = array.slice().sort((a, b) => a - b);

    for (let i = 0; i < array.length / 2; i++) {
        result.push(newArray.shift());
        result.push(newArray.pop());
    }

    return result;
}
sortingNumber([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);
