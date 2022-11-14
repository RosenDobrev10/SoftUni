function burgerBus(arr) {
    let cities = Number(arr.shift());
    let totalProfit = 0;
    for (let i = 0; i < cities; i++) {
        let city = arr.shift();
        let income = Number(arr.shift());
        let expenses = Number(arr.shift());
        (i + 1) % 3 === 0 ? (expenses *= 1.5) : null;
        (i + 1) % 5 === 0 ? (income *= 0.9) : null;
        (i + 1) % 3 === 0 && (i + 1) % 5 === 0 ? (expenses /= 1.5) : null;
        totalProfit += income - expenses;
        console.log(`In ${city} Burger Bus earned ${(income - expenses).toFixed(2)} leva.`);
    }
    console.log(`Burger Bus total profit: ${totalProfit.toFixed(2)} leva.`);
}
burgerBus([
    "5",
    "Lille",
    "2226.00",
    "1200.60",
    "Rennes",
    "6320.60",
    "5460.20",
    "Reims",
    "600.20",
    "452.32",
    "Bordeaux",
    "6925.30",
    "2650.40",
    "Montpellier",
    "680.50",
    "290.20",
]);
