function bombNumbers(array1, array2) {
    let [bomb, power] = array2;
    while (array1.includes(bomb)) {
        let start = Math.max(0, array1.indexOf(bomb) - power);
        array1.splice(start, power * 2 + 1);
    }
    console.log(array1.reduce((a, b) => a + b, 0));
}
