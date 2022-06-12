function easterBake(input) {
    let index = 0;
    let number = Number(input[index++]);
    let gramsSugar = 0;
    let gramsFlour = 0;
    let maxSugar = 0;
    let maxFlour = 0;

    for (let i = 0; i < number; i++) {
        let currentSugar = Number(input[index++]);
        gramsSugar += currentSugar;
        if (currentSugar > maxSugar) {
            maxSugar = currentSugar;
        }
        let currentFlour = Number(input[index++]);
        gramsFlour += currentFlour;
        if (currentFlour > maxFlour) {
            maxFlour = currentFlour;
        }
    }
    let countSugar = Math.ceil(gramsSugar / 950);
    let countFlour = Math.ceil(gramsFlour / 750);
    console.log(`Sugar: ${countSugar}`);
    console.log(`Flour: ${countFlour}`);
    console.log(`Max used flour is ${maxFlour} grams, max used sugar is ${maxSugar} grams.`);
}
easterBake(["4", "500", "350", "560", "430", "600", "345", "578", "543"]);
