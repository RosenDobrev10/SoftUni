function sumFirstLast(array) {

    const first = Number(array.shift());
    const last = Number(array.pop());
    return first + last;
}
sumFirstLast(["20", "30", "40"]);
sumFirstLast(["5", "10"]);
