function mobileOperator(input) {
    let term = input[0];
    let type = input[1];
    let mobileInternet = input[2];
    let months = Number(input[3]);
    let tax = 0;

    switch (type) {
        case "Small":
            if (term === "one") {
                tax = 9.98;
            } else {
                tax = 8.58;
            }
            break;
        case "Middle":
            if (term === "one") {
                tax = 18.99;
            } else {
                tax = 17.09;
            }
            break;
        case "Large":
            if (term === "one") {
                tax = 25.98;
            } else {
                tax = 23.59;
            }
            break;
        case "ExtraLarge":
            if (term === "one") {
                tax = 35.99;
            } else {
                tax = 31.79;
            }
            break;
    }
    if (mobileInternet === "yes") {
        if (tax <= 10) {
            tax += 5.5;
        } else if (tax <= 30) {
            tax += 4.35;
        } else {
            tax += 3.85;
        }
    }
    if (term === "two") {
        tax = tax * 0.9625;
    }
    tax = tax * months;
    console.log(`${tax.toFixed(2)} lv.`);
}
mobileOperator(["two", "Small", "yes", "20"]);
