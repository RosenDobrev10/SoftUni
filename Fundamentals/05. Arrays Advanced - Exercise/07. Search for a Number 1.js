function searchForANumber(array1, array2) {
    let [numbersToTakeFromArrayOne, numbersToDelete, number] = array2;
    let arr = array1.slice(0, numbersToTakeFromArrayOne);
    arr.splice(0, numbersToDelete);
    let resultArr = arr.filter((num) => num === number);
    console.log(`Number ${number} occurs ${resultArr.length} times.`);
}
