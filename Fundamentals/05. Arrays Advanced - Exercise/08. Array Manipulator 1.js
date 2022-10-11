function arrayManipulator(array1, array2) {
    for (let line of array2) {
        let currentLine = line.split(" ");
        let command = currentLine[0];
        let param1 = Number(currentLine[1]);
        let param2 = Number(currentLine[2]);
        if (command === "add") {
            array1.splice(param1, 0, param2);
        } else if (command === "addMany") {
            for (let i = 2; i < currentLine.length; i++) {
                array1.splice(param1, 0, Number(currentLine[i]));
                param1++;
            }
        } else if (command === "contains") {
            array1.indexOf(param1) !== -1 ? console.log(array1.indexOf(param1)) : console.log(-1);
        } else if (command === "remove") {
            array1.splice(param1, 1);
        } else if (command === "shift") {
            for (let i = 0; i < param1; i++) {
                array1.push(array1.shift());
            }
        } else if (command === "sumPairs") {
            let newArray = []
            while (array1.length > 0) {
                array1.length === 1 ? newArray.push(array1[0]) : newArray.push(array1[0] + array1[1])
                array1.splice(0, 2)
            }
            array1 = newArray
        } else if (command === "print") {
            console.log(`[ ${array1.join(", ")} ]`);
            break;
        }
    }
}
