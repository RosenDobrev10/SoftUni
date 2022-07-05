function FoodDelivery(input) {
    let chickenMenu = 10.35;
    let fishMenu = 12.4;
    let veganMenu = 8.15;
    let delivery = 2.5;

    let chickenOrders = Number(input[0]);
    let fishOrders = Number(input[1]);
    let veganOrders = Number(input[2]);
    let order =
        chickenMenu * chickenOrders +
        fishMenu * fishOrders +
        veganMenu * veganOrders;
    let desert = (order * 20) / 100;
    let orderPrice = order + desert + delivery;

    console.log(orderPrice);
}
FoodDelivery(["9", "2", "6"]);
