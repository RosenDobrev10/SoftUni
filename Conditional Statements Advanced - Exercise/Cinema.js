function cinema(input) {
    let typeProjection = input[0];
    let rows = Number(input[1]);
    let columns = Number(input[2]);
    let income = 0.0;

    if (typeProjection === "Premiere") {
        income = 12.0 * rows * columns;
    } else if (typeProjection === "Normal") {
        income = 7.5 * rows * columns;
    } else if (typeProjection === "Discount") {
        income = 5 * rows * columns;
    }
    console.log(`${income.toFixed(2)} leva`);
}
cinema(["Premiere", "10", "12"]);
