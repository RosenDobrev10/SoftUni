function computerStore(arr) {
    let totalPrice = 0;
    let taxes = 0;
    let totalPriceWithoutTaxes = 0;
    while (arr[0] !== "special") {
        if (arr[0] === "regular") {
            break;
        }
        let partPrice = Number(arr.shift());
        if (partPrice >= 0) {
            totalPriceWithoutTaxes += partPrice;
            taxes += partPrice * 0.2;
        } else {
            console.log("Invalid price!");
        }
    }
    if (totalPriceWithoutTaxes === 0) {
        return console.log("Invalid order!")
    }
    arr[0] === "special" ? (totalPrice = (totalPriceWithoutTaxes + taxes) * 0.9) : totalPrice = totalPriceWithoutTaxes + taxes;
    console.log(`Congratulations you've just bought a new computer!
Price without taxes: ${totalPriceWithoutTaxes.toFixed(2)}$
Taxes: ${taxes.toFixed(2)}$
-----------
Total price: ${totalPrice.toFixed(2)}$
`);
}
