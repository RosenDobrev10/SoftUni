function employees(arr) {
    const persons = {};
    arr.forEach(line => persons[line] = line.length);
    for (let person of Object.keys(persons)) {
        console.log(`Name: ${person} -- Personal Number: ${persons[person]}`);
    }
}
