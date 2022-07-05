function HousePainting(input) {
    let height = Number(input[0]);
    let length = Number(input[1]);
    let heightRoof = Number(input[2]);

    let frontBack = height * height * 2;
    let finalFrontBack = frontBack - 1.2 * 2;

    let sides = height * length * 2;
    let finalSides = sides - 1.5 * 1.5 * 2;

    let roofFrontBack = ((height * heightRoof) / 2) * 2;
    let roofSides = height * length * 2;

    let allGreen = (finalSides + finalFrontBack) / 3.4;
    let allRed = (roofFrontBack + roofSides) / 4.3;

    console.log(allGreen.toFixed(2));
    console.log(allRed.toFixed(2));
}
HousePainting(["6", "10", "5.2"]);
