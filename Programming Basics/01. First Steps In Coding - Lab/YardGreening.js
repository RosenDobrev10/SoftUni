function YardGreening(input) {
    let square = 7.61;
    let discount = 0.18;
    let All = square * input[0];
    let allDiscount = discount * All;
    let finalPrice = All - allDiscount;

    console.log(`The final price is : ${finalPrice} lv.`);
    console.log(`The discount is : ${allDiscount} lv.`);
}
YardGreening([150]);
