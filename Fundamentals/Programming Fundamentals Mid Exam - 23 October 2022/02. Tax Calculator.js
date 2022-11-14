function taxCalculator(arr) {
    let cars = arr.shift().split(">>");
    let totalTaxes = 0;
    for (let line of cars) {
        let token = line.split(" ");
        let carType = token[0];
        let years = Number(token[1]);
        let kilometers = Number(token[2]);
        let tax = 0;
        let kilometersTax = 0;
        if (carType !== "family" && carType !== "heavyDuty" && carType !== "sports") {
            console.log("Invalid car type.");
            continue;
        } else if (carType === "family") {
            kilometersTax = Math.floor(kilometers / 3000);
            tax = kilometersTax * 12 + (50 - years * 5);
        } else if (carType === "heavyDuty") {
            kilometersTax = Math.floor(kilometers / 9000);
            tax = kilometersTax * 14 + (80 - years * 8);
        } else if (carType === "sports") {
            kilometersTax = Math.floor(kilometers / 2000);
            tax = kilometersTax * 18 + (100 - years * 9);
        }
        totalTaxes += tax;
        console.log(`A ${carType} car will pay ${tax.toFixed(2)} euros in taxes.`);
    }
    console.log(`The National Revenue Agency will collect ${totalTaxes.toFixed(2)} euros in taxes.`);
}
taxCalculator([
    "family 5 3210>>pickUp 1 1345>>heavyDuty 7 21000>>sports 5 9410>>family 3 9012",
]);
