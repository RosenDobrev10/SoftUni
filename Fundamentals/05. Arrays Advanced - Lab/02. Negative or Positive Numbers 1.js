function negativeOrPositiveNumbers(array) {
    let resultArray = [];
    array.forEach(el => el < 0 ? resultArray.unshift(el) : resultArray.push(el));
    console.log(resultArray.join("\n"));
}
