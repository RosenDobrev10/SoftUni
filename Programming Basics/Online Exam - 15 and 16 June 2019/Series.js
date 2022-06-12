function series(input) {
    let index = 0;
    let budget = Number(input[index++]);
    let numberSeries = Number(input[index++]);
    let money = 0;

    for (let i = 0; i < numberSeries; i++) {
        let currentSerial = input[index++];
        let priceSerial = Number(input[index++]);
        switch (currentSerial) {
            case "Thrones":
                money += priceSerial * 0.5;
                break;
            case "Lucifer":
                money += priceSerial * 0.6;
                break;
            case "Protector":
                money += priceSerial * 0.7;
                break;
            case "TotalDrama":
                money += priceSerial * 0.8;
                break;
            case "Area":
                money += priceSerial * 0.9;
                break;
            default:
                money += priceSerial;
                break;
        }
    }
    let diff = Math.abs(money - budget);
    if (budget >= money) {
        console.log(`You bought all the series and left with ${diff.toFixed(2)} lv.`);
    } else {
        console.log(`You need ${diff.toFixed(2)} lv. more to buy the series!`);
    }
}
series(["25","6","Teen Wolf","8","Protector","5", "TotalDrama", "5","Area","4","Thrones","5","Lucifer","9",]);
