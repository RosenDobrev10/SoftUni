function carWash(array) {
    let percentageValue = 0;
    for (let index of array) {
        switch (index) {
            case "soap": percentageValue += 10; break;
            case "water": percentageValue *= 1.2; break;
            case "vacuum cleaner": percentageValue *= 1.25; break;
            case "mud": percentageValue *= 0.9; break;
        }
    }
    console.log(`The car is ${percentageValue.toFixed(2)}% clean.`);
}
//carWash(['soap', 'soap', 'vacuum cleaner', 'mud', 'soap', 'water'])
carWash(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"]);
