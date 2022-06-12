function schoolCamp(input) {
    let season = input[0];
    let type = input[1];
    let students = Number(input[2]);
    let nights = Number(input[3]);
    let sport = "";
    let price = 0;

    switch (season) {
        case "Winter":
            if (type === "girls") {
                sport = "Gymnastics";
                price = 9.6;
            } else if (type === "boys") {
                sport = "Judo";
                price = 9.6;
            } else {
                sport = "Ski";
                price = 10;
            }
            break;
        case "Spring":
            if (type === "girls") {
                sport = "Athletics";
                price = 7.2;
            } else if (type === "boys") {
                sport = "Tennis";
                price = 7.2;
            } else {
                sport = "Cycling";
                price = 9.5;
            }
            break;
        case "Summer":
            if (type === "girls") {
                sport = "Volleyball";
                price = 15;
            } else if (type === "boys") {
                sport = "Football";
                price = 15;
            } else {
                sport = "Swimming";
                price = 20;
            }
            break;
    }
    if (students >= 50) {
        price = students * price * nights * 0.5;
    } else if (students >= 20) {
        price = students * price * nights * 0.85;
    } else if (students >= 10) {
        price = students * price * nights * 0.95;
    } else {
        price = students * price * nights;
    }
    console.log(`${sport} ${price.toFixed(2)} lv.`);
}
schoolCamp(["Spring", "girls", "20", "7"]);
