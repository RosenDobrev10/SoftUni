function gymnastics(input) {
    let country = input[0];
    let type = input[1];
    let score = 0;

    switch (country) {
        case "Russia":
            if (type === "ribbon") {
                score = 9.1 + 9.4;
            } else if (type === "hoop") {
                score = 9.3 + 9.8;
            } else {
                score = 9.6 + 9.0;
            }
            break;
        case "Bulgaria":
            if (type === "ribbon") {
                score = 9.6 + 9.4;
            } else if (type === "hoop") {
                score = 9.55 + 9.75;
            } else {
                score = 9.5 + 9.4;
            }
            break;
        case "Italy":
            if (type === "ribbon") {
                score = 9.2 + 9.5;
            } else if (type === "hoop") {
                score = 9.45 + 9.35;
            } else {
                score = 9.7 + 9.15;
            }
            break;
    }
    console.log(`The team of ${country} get ${score.toFixed(3)} on ${type}.`);
    console.log(`${(100 - (score / 20) * 100).toFixed(2)}%`);
}
gymnastics(["Italy", "hoop"]);
