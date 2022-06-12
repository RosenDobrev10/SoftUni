function personalTitles(input) {
    let age = Number(input[0]);
    let gender = input[1];

    if (gender === "f") {
        if (age < 16) {
            console.log("Miss");
        } else {
            console.log("Ms.");
        }
    } else {
        if (age < 16) {
            console.log("Master");
        } else {
            console.log("Mr.");
        }
    }
}
personalTitles(["12", "f"]);
