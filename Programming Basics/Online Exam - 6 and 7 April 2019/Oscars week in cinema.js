function oscarsWeekInCinema(input) {
    let movie = input[0];
    let hall = input[1];
    let tickets = Number(input[2]);
    let income = 0;

    switch (movie) {
        case "A Star Is Born":
            if (hall === "normal") {
                income = tickets * 7.5;
            } else if (hall === "luxury") {
                income = tickets * 10.5;
            } else if (hall === "ultra luxury") {
                income = tickets * 13.5;
            }
            break;
        case "Bohemian Rhapsody":
            if (hall === "normal") {
                income = tickets * 7.35;
            } else if (hall === "luxury") {
                income = tickets * 9.45;
            } else if (hall === "ultra luxury") {
                income = tickets * 12.75;
            }
            break;
        case "Green Book":
            if (hall === "normal") {
                income = tickets * 8.15;
            } else if (hall === "luxury") {
                income = tickets * 10.25;
            } else if (hall === "ultra luxury") {
                income = tickets * 13.25;
            }
            break;
        case "The Favourite":
            if (hall === "normal") {
                income = tickets * 8.75;
            } else if (hall === "luxury") {
                income = tickets * 11.55;
            } else if (hall === "ultra luxury") {
                income = tickets * 13.95;
            }
            break;
    }
    console.log(`${movie} -> ${income.toFixed(2)} lv.`);
}
oscarsWeekInCinema(["A Star Is Born", "luxury", "42"]);
