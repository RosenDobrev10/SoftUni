function firstAndLastKNumbers(array) {
    let count = array.shift();
    console.log(array.slice(0, count).join(" "));
    console.log(array.slice(-count).join(" "));
}
