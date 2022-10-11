function sorting(array) {
    let resultArray = [];
    array.sort((a, b) => a - b);
    let length = array.length;
    for (let i = 0; i < length; i++) {
        i % 2 === 0 ? resultArray.push(array.pop()) : resultArray.push(array.shift());
    }
    console.log(resultArray.join(" "));
}
