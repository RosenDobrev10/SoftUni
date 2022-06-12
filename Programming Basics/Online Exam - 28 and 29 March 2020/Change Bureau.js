function changeBureau(input) {
    let bitcoin = Number(input[0]);
    let iuan = Number(input[1]);
    let comission = Number(input[2]);
    
    let bitcoinInLeva = bitcoin * 1168;
    let IuanInDollars = iuan * 0.15;
    let iuanInLeva = IuanInDollars * 1.76;
    let allInLeva = bitcoinInLeva + iuanInLeva;
    let allInEuro = allInLeva / 1.95;
    let final = allInEuro - (allInEuro * comission) / 100;
    console.log(final.toFixed(2));
}
changeBureau(["7", "50200.12", "3"]);
