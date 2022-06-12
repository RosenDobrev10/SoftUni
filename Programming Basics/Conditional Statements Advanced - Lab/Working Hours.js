function workingHours(input) {
    let time = Number(input[0]);
    let day = input[1];

    if (time >= 10 && (time <= 18) & (day !== "Sunday")) {
        console.log("open");
    } else {
        console.log("closed");
    }
}
workingHours(["11", "Monday"]);
