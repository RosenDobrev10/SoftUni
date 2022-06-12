function CircleAreaAndPerimeter(input) {
    let radius = Number(input[0]);

    let circleArea = Math.PI * radius * radius;
    let perimeter = 2 * Math.PI * radius;
    console.log(circleArea.toFixed(2));
    console.log(perimeter.toFixed(2));
}
CircleAreaAndPerimeter(["3"]);
