function areaOfFigures(input) {
    let form = input[0];

    if (form === "square") {
        sideSquare = Number(input[1]);
        areaSquare = sideSquare * sideSquare;
        console.log(areaSquare.toFixed(3));
    } else if (form === "rectangle") {
        side1 = Number(input[1]);
        side2 = Number(input[2]);
        areaRectangle = side1 * side2;
        console.log(areaRectangle.toFixed(3));
    } else if (form === "circle") {
        radius = Number(input[1]);
        areaCircle = Math.PI * Math.pow(radius, 2); // S = Pi * r * r
        console.log(areaCircle.toFixed(3));
    } else if (form === "triangle") {
        sideTriangle = Number(input[1]);
        heightTriangle = Number(input[2]);
        areaTriangle = (sideTriangle * heightTriangle) / 2;
        console.log(areaTriangle.toFixed(3));
    }
}
areaOfFigures(["circle", "6"]);
