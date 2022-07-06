function rotateArray(array, rotations) {
    
    for (let i = 0; i < rotations; i++) {
        array.unshift(array.pop());
    }

    console.log(array.join(" "));
}
rotateArray(["1", "2", "3", "4"], 2);
rotateArray(["Banana", "Orange", "Coconut", "Apple"], 15);
