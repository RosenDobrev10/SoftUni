function flowerShop(input) {
    let magnolias = Number(input[0]);
    let hyacinths = Number(input[1]); // Зюмбюл
    let roses = Number(input[2]);
    let cactuses = Number(input[3]);
    let priceGift = Number(input[4]);

    let totalPrice = magnolias * 3.25 + hyacinths * 4 + roses * 3.5 + cactuses * 8;
    let tax = totalPrice * 0.05;
    let earnMoney = totalPrice - tax;
    let diff = Math.abs(earnMoney - priceGift);

    if (earnMoney >= priceGift) {
        console.log(`She is left with ${Math.floor(diff)} leva.`);
    } else {
        console.log(`She will have to borrow ${Math.ceil(diff)} leva.`);
    }
}
flowerShop(["2", "3", "5", "1", "50"]);
