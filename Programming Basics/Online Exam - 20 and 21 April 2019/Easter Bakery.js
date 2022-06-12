function easterBakery(input) {
    let wheatPrice = Number(input[0]);
    let wheatKilos = Number(input[1]);
    let sugarKilos = Number(input[2]);
    let eggs = Number(input[3]);
    let yeast = Number(input[4]);
    let sugarPrice = wheatPrice * 0.75;
    let eggsPrice = wheatPrice * 1.1;
    let yeastPrice = sugarPrice * 0.2;
    let all = wheatPrice * wheatKilos + sugarPrice * sugarKilos + eggs * eggsPrice + yeast * yeastPrice;
    console.log(all.toFixed(2));
}
easterBakery(["50", "10", "3.5", "6", "1"]);
