function newHouse(input) {
    let flower = input[0];
    let amountFlowers = Number(input[1]);
    let budget = Number(input[2]);

    finalPrice = 0.0;

    if (flower === "Roses") {
        finalPrice = amountFlowers * 5;
    } else if (flower === "Dahlias") {
        finalPrice = amountFlowers * 3.8;
    } else if (flower === "Tulips") {
        finalPrice = amountFlowers * 2.8;
    } else if (flower === "Narcissus") {
        finalPrice = amountFlowers * 3;
    } else if (flower === "Gladiolus") {
        finalPrice = amountFlowers * 2.5;
    }

    if (flower === "Roses" && amountFlowers > 80) {
        finalPrice = finalPrice * 0.9;
    }
    if (flower === "Dahlias" && amountFlowers > 90) {
        finalPrice = finalPrice * 0.85;
    }
    if (flower === "Tulips" && amountFlowers > 80) {
        finalPrice = finalPrice * 0.85;
    }
    if (flower === "Narcissus" && amountFlowers < 120) {
        finalPrice = finalPrice * 1.15;
    }
    if (flower === "Gladiolus" && amountFlowers < 80) {
        finalPrice = finalPrice * 1.2;
    }

    let diff = Math.abs(finalPrice - budget);

    if (finalPrice <= budget) {
        console.log(`Hey, you have a great garden with ${amountFlowers} ${flower} and ${diff.toFixed(2)} leva left.`);
    } else {
        console.log(`Not enough money, you need ${diff.toFixed(2)} leva more.`);
    }
}
newHouse(["Narcissus", "119", "360"]);
