function printEveryNElementFromAnArray(array, step) {

    let result = [];

    for (let index = 0; index < array.length; index += step) {
        const element = array[index];
        result.push(element);
    }

    return result;
}
printEveryNElementFromAnArray(["5", "20", "31", "4", "20"], 2);
printEveryNElementFromAnArray(["dsa", "asd", "test", "tset"], 2);
printEveryNElementFromAnArray(["1", "2", "3", "4", "5"], 6);
