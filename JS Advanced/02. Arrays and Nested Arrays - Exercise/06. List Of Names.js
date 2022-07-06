function listOfNames(array) {
    
    array
        .sort((a, b) => a.localeCompare(b))
        .forEach((name, number) => console.log(`${++number}.${name}`));
}
listOfNames(["John", "Bob", "Christina", "Ema"]);
