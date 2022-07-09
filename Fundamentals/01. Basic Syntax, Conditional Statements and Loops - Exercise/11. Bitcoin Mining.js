function bitcoinMining(input) {
    
    let days = 0;
    let countBitcoins = 0;
    let totalMoney = 0;
    let firstDayBuy = 0;
    let bitcoinCounter = 0;
    const bitcoin = 11949.16;
    const gramGold = 67.51;
    
    for (let i = 0; i < input.length; i++) {
        days++;
        let element = input[i];
        if (days % 3 === 0) {
            element *= 0.7;
        }
        let dayEarning = element * gramGold;
        totalMoney += dayEarning;
        if (totalMoney >= bitcoin) {
            bitcoinCounter++;
            let bitcoinsPerDay = Math.floor(totalMoney / bitcoin);
            countBitcoins += bitcoinsPerDay;
            totalMoney -= bitcoin * bitcoinsPerDay;
        }
        if (bitcoinCounter === 1) {
            firstDayBuy = days;
        }
    }
    
    console.log(`Bought bitcoins: ${countBitcoins}`);
    if (countBitcoins > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstDayBuy}`);
    }
    console.log(`Left money: ${totalMoney.toFixed(2)} lv.`);
}
bitcoinMining([3124.15, 504.212, 2511.124]);
