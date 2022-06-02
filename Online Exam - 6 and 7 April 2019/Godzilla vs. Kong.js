function godzillaVsKong(input) {
    let budget = Number(input[0]);
    let extras = Number(input[1]); // extra = Статист
    let priceClothesExtra = Number(input[2]);
    let decor = 0.1 * budget;
    if (extras > 150) {
        priceClothesExtra = priceClothesExtra * 0.9;
    }
    let allCost = decor + extras * priceClothesExtra;
    let diff = Math.abs(allCost - budget);
    if (budget >= allCost) {
        console.log(`Action!\nWingard starts filming with ${diff.toFixed(2)} leva left.`); // \n = Команда за започване на нов ред
    } else {
        console.log(`Not enough money!\nWingard needs ${diff.toFixed(2)} leva more.`);
    }
}
godzillaVsKong(["20000", "120", "55.5"]);
