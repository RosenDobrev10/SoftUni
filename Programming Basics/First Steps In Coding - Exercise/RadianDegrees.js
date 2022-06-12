function radianDegrees(input) {
    let radian = Number(input[0]);
    let degrees = (radian * 180) / Math.PI;
    console.log(degrees);
}
radianDegrees(["3.1416"]);
