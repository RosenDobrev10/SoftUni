function truckDriver(input) {
    let season = input[0];
    let kilometers = Number(input[1]);
    let salary = 0;

    switch (season) {
        case "Spring":
        case "Autumn":
            if (kilometers <= 5000) {
                salary = kilometers * 0.75;
            } else if (kilometers <= 10000) {
                salary = kilometers * 0.95;
            }
            break;
        case "Summer":
            if (kilometers <= 5000) {
                salary = kilometers * 0.9;
            } else if (kilometers <= 10000) {
                salary = kilometers * 1.1;
            }
            break;
        case "Winter":
            if (kilometers <= 5000) {
                salary = kilometers * 1.05;
            } else if (kilometers <= 10000) {
                salary = kilometers * 1.25;
            }
            break;
    }
    if (kilometers > 10000 && kilometers <= 20000) {
        salary = kilometers * 1.45;
    }
    let finalSalary = salary * 0.9 * 4;
    console.log(finalSalary.toFixed(2));
}
truckDriver(["Spring", "1600"]);
