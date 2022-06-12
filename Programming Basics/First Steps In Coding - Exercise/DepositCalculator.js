function Deposit(input) {
    let depositsum = Number(input[0]);
    let months = Number(input[1]);
    let Yearpro = Number(input[2] / 100);
    let rate = depositsum * Yearpro;
    let rateMonth = rate / 12;
    let sum = depositsum + months * rateMonth;
    console.log(sum);
}

Deposit(["2350", "6", "7"]);
