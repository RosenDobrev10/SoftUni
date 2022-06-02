function computerFirm(input) {
    let index = 0;
    let computers = Number(input[index++]);
    let finalSales = 0;
    let sumRating = 0;

    for (let i = 1; i <= computers; i++) {
        let currentmodel = Number(input[index++]);
        let rating = currentmodel % 10;
        sumRating += rating;
        let sales = Math.floor(currentmodel / 10);
        if (rating === 2) {
            finalSales += 0 * sales;
        } else if (rating === 3) {
            finalSales += 0.5 * sales;
        } else if (rating === 4) {
            finalSales += 0.7 * sales;
        } else if (rating === 5) {
            finalSales += 0.85 * sales;
        } else if (rating === 6) {
            finalSales += sales;
        }
    }
    console.log(finalSales.toFixed(2));
    console.log((sumRating / computers).toFixed(2));
}
computerFirm(["5", "122", "156", "202", "214", "185"]);
