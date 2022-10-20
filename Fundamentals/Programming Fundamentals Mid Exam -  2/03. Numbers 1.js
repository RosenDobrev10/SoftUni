function numbers(arr) {
    let nums = arr.split(" ").map(Number).sort((a, b) => b - a);
    let average = nums.reduce((acc, x) => acc + x) / nums.length;
    let aboveAverage = nums.filter((num) => num > average).slice(0, 5).join(" ");
    aboveAverage === "" ? console.log("No") : console.log(aboveAverage);
}
