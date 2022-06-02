function TriangleArea(input) {
    let a = Number(input[0]);
    let h = Number(input[1]);
    let area = (a * h) / 2;
    console.log(area.toFixed(2));
}
TriangleArea(["20", "30"]);
