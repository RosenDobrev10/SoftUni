function multiplyBy2(input) {
    let index = 0;
    let number = Number(input[index++]);

    while (number >= 0) {
        console.log(`Result: ${(number * 2).toFixed(2)}`);
        number = Number(input[index++]);
    }
    if (number < 0) {
        console.log("Negative number!");
    }
}
multiplyBy2(["12", "43.2144", "12.3", "543.23", "-20"]);
