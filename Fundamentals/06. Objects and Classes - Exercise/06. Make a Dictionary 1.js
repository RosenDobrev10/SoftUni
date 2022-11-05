function makeADictionary(arr) {
    let dictionary = {};
    for (let line of arr) {
        let obj = JSON.parse(line);
        dictionary = Object.assign(dictionary, obj);
    }
    let sortedDictionary = Object.keys(dictionary).sort((a, b) => a.localeCompare(b));
    for (let term of sortedDictionary) {
        console.log(`Term: ${term} => Definition: ${dictionary[term]}`);
    }
}
