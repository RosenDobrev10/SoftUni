function listOfNames(array) {

    let number = 1;
    array.sort((a, b) => a.localeCompare(b));
    
    for (const name of array) {
        console.log(`${number}.${name}`);
        number++;
    }
}
listOfNames(["John", "Bob", "Christina", "Ema"]);
