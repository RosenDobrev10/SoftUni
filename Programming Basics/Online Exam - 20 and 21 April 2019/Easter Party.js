function easterParty(input) {
    let guests = Number(input[0]);
    let price = Number(input[1]);
    let budget = Number(input[2]);
    let cake = 0.1 * budget;
    if (guests >= 10 && guests <= 15) {
        price = price * 0.85;
    } else if (guests > 15 && guests <= 20) {
        price = price * 0.8;
    } else if (guests > 20) {
        price = price * 0.75;
    }
    let allMoney = price * guests + cake;
    let diff = Math.abs(allMoney - budget);
    if (budget >= allMoney) {
        console.log(`It is party time! ${diff.toFixed(2)} leva left.`);
    } else {
        console.log(`No party! ${diff.toFixed(2)} leva needed.`);
    }
}
easterParty(["8", "25", "340"]);
