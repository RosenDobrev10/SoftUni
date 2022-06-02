function logistics(input) {
    let index = 0;
    let number = Number(input[index++]);
    let price = 0;
    let tonsBus = 0;
    let tonsTruck = 0;
    let tonsTrain = 0;

    for (let i = 0; i < number; i++) {
        let currentTons = Number(input[index++]);
        if (currentTons <= 3) {
            tonsBus += currentTons;
            price += currentTons * 200;
        } else if (currentTons <= 11) {
            tonsTruck += currentTons;
            price += currentTons * 175;
        } else {
            tonsTrain += currentTons;
            price += currentTons * 120;
        }
    }
    let allTons = tonsBus + tonsTruck + tonsTrain;
    let averagePrice = price / allTons;
    console.log(averagePrice.toFixed(2));
    console.log(((tonsBus / allTons) * 100).toFixed(2) + "%");
    console.log(((tonsTruck / allTons) * 100).toFixed(2) + "%");
    console.log(((tonsTrain / allTons) * 100).toFixed(2) + "%");
}
logistics(["4", "1", "5", "16", "3"]);
