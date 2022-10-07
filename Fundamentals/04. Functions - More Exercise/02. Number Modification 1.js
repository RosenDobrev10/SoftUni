function numberModification(num) {
    while (String(num).split("").map(Number).reduce((a, b) => a + b, 0) / String(num).length <= 5) {
        num += "9";
    }
    console.log(num);
}
