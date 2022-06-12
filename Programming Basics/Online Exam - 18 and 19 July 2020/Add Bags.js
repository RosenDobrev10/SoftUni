function addBags(input) {
    let priceOver20Kg = Number(input[0]);
    let luggaggeKG = Number(input[1]);
    let days = Number(input[2]);
    let count = Number(input[3]);
    let price = 0;

    if (luggaggeKG < 10) {
        price = priceOver20Kg * 0.2;
    } else if (luggaggeKG >= 10 && luggaggeKG <= 20) {
        price = priceOver20Kg * 0.5;
    } else {
        price = priceOver20Kg;
    }
    if (days < 7) {
        price *= 1.4;
    } else if (days >= 7 && days <= 30) {
        price *= 1.15;
    } else {
        price *= 1.1;
    }
    
    let finalPrice = price * count;
    console.log(`The total price of bags is: ${finalPrice.toFixed(2)} lv.`);
}
addBags(["63.80", "23", "3", "1"]);
