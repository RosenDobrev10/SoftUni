function operationsBetweenNumbers(input) {
    let n1 = Number(input[0]);
    let n2 = Number(input[1]);
    let operator = input[2];

    let result = 0;
    let leftover = 0;
    let evenOrOdd;

    if (operator === "+" || operator === "-" || operator === "*") {
        if (operator === "+") {
            result = n1 + n2;
            if (result % 2 === 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            console.log(`${n1} ${operator} ${n2} = ${result} - ${evenOrOdd}`);
        } else if (operator === "-") {
            result = n1 - n2;
            if (result % 2 === 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            console.log(`${n1} ${operator} ${n2} = ${result} - ${evenOrOdd}`);
        } else if (operator === "*") {
            result = n1 * n2;
            if (result % 2 === 0) {
                evenOrOdd = "even";
            } else {
                evenOrOdd = "odd";
            }
            console.log(`${n1} ${operator} ${n2} = ${result} - ${evenOrOdd}`);
        }
    } else if (operator === "/") {
        if (n2 === 0) {
            console.log(`Cannot divide ${n1} by zero`);
        } else {
            result = n1 / n2;
            console.log(`${n1} / ${n2} = ${result.toFixed(2)}`);
        }
    } else if (operator === "%") {
        if (n2 === 0) {
            console.log(`Cannot divide ${n1} by zero`);
        } else {
            leftover = n1 % n2;
            console.log(`${n1} % ${n2} = ${leftover}`);
        }
    }
}
operationsBetweenNumbers(["10", "12", "+"]);
