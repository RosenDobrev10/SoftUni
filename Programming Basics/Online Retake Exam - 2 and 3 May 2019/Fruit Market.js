function fruitMarket(priceStrawberry, banana, orange, raspberry, strawberry) {
     priceStrawberry = Number(priceStrawberry);
     banana = Number(banana);
     orange = Number(orange);
     raspberry = Number(raspberry);
     strawberry = Number(strawberry);
    let priceRaspberry = priceStrawberry * 0.5;
    let priceOrange = priceRaspberry * 0.6;
    let priceBanana = priceRaspberry * 0.2;
    let money = priceStrawberry * strawberry + priceBanana * banana + priceOrange * orange + priceRaspberry * raspberry;
    console.log(money.toFixed(2));
}
fruitMarket("48","10","3.3","6.5","1.7");
