function bikeRace(input) {
    let juniors = Number(input[0]);
    let seniors = Number(input[1]);
    let trace = input[2];

    let allpeople = juniors + seniors;
    let tax = 0;

    switch (trace) {
        case "trail": tax = juniors * 5.5 + seniors * 7;break;
        case "cross-country":
            if (allpeople >= 50) {
                tax = (juniors * 8 + seniors * 9.5) * 0.75;
            } else {
                tax = juniors * 8 + seniors * 9.5;
            }
            break;
        case "downhill": tax = juniors * 12.25 + seniors * 13.75;break;
        case "road": tax = juniors * 20 + seniors * 21.5;break;
    }
    let charity = tax * 0.95;
    console.log(charity.toFixed(2));
}
bikeRace(["10", "20", "trail"]);
