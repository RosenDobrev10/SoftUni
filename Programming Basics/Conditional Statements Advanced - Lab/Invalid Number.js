function invalidNumber(input) {
    let number = Number(input[0]);
    let isValid = (number >= 100 && number <= 200) || number === 0;
    if (!isValid) {
        console.log("invalid");
    } else {
    }
}
invalidNumber(["-75"]);
