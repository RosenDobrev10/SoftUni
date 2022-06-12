function VegetableMarket(input) {
    let vegetablePerKilo = Number(input[0]);
    let fruitPerKilo = Number(input[1]);
    let vegetableKilo = Number(input[2]);
    let fruitKilo = Number(input[3]);
    let incomeLv = vegetablePerKilo * vegetableKilo + fruitPerKilo * fruitKilo;
    let incomeEuro = incomeLv / 1.94;
    console.log(incomeEuro.toFixed(2));
}
VegetableMarket(["0.194", "19.4", "10", "10"]);
