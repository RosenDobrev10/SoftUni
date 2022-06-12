function christmasPreparation(input) {
    let rolls = Number(input[0]);
    let plat = Number(input[1]);
    let litersGlue = Number(input[2]);
    let percentDiscount = Number(input[3]);

    let sum = rolls * 5.8 + plat * 7.2 + litersGlue * 1.2;
    let finalSum = sum - (sum * percentDiscount) / 100;
    console.log(finalSum.toFixed(3));
}
christmasPreparation(["2", "3", "2.5", "25"]);
