function greaterNumber(input) {
    let firstNum = Number(input[0]);
    let secondNum = Number(input[1]);

    if (firstNum > secondNum) {
        console.log(firstNum);
    } else {
        console.log(secondNum);
    }
}
greaterNumber(["5", "3"]);
