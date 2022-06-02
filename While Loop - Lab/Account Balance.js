function accountBalance(input) {
    let index = 0
    let currentInput = input[index++];
    let totalSum = 0;
    
    while (currentInput !== "NoMoreMoney") {
        let amount = Number(currentInput);
        if (amount < 0) {
            console.log("Invalid operation!");
            break;
        }
        totalSum += amount;
        console.log(`Increase: ${amount.toFixed(2)}`);
        currentInput = input[index++];
    }
    console.log(`Total: ${totalSum.toFixed(2)}`);
}
accountBalance(["5.51", "69.42", "100", "NoMoreMoney"]);
