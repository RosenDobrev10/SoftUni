function rotateArray(arr, rotations) {
    rotations = rotations % arr.length;
    if (rotations === 0) {
        return console.log(arr.join(" "));
    }
    for (let i = 0; i < rotations; i++) {
        arr.unshift(arr.pop());
    }
    console.log(arr.join(" "));
}
