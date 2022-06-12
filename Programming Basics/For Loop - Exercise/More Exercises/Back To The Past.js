function backToThePast(input) {
    let inheriteMoney = Number(input[0]);
    let yearToLive = Number(input[1]);
    let years = 18;

    for (let i = 1800; i <= yearToLive; i++) {
        if (i % 2 === 0) {
            inheriteMoney -= 12000;
        } else {
            inheriteMoney -= 12000 + 50 * years;
        }
        years++;
    }
    if (inheriteMoney >= 0) {
        console.log(`Yes! He will live a carefree life and will have ${inheriteMoney.toFixed(2)} dollars left.`);
    } else {
        console.log(`He will need ${Math.abs(inheriteMoney).toFixed(2)} dollars to survive.`);
    }
}
backToThePast(["100000.15", "1808"]);
