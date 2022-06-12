function miningRig(input) {
    let priceVideocard = Number(input[0]);
    let priceAdapter = Number(input[1]);
    let priceElectricity = Number(input[2]);
    let videocardEarning = Number(input[3]);

    let investedMoney = 13 * priceVideocard + 13 * priceAdapter + 1000;
    let days = Math.ceil(investedMoney / ((videocardEarning - priceElectricity) * 13));

    console.log(investedMoney);
    console.log(days);
}
miningRig(["700", "15", "0.20", "2"]);
miningRig((["800","10","0.32","6.4"]));
