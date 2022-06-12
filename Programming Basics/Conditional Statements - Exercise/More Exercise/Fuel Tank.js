function fuelTank(input) {
    let typeFuel = input[0];
    let litersFuel = Number(input[1]);
    let lowerCaseTypeFuel = typeFuel.toLowerCase();

    if (litersFuel >= 25 && (typeFuel === "Diesel" || typeFuel === "Gasoline" || typeFuel === "Gas")) {
        console.log(`You have enough ${lowerCaseTypeFuel}.`);
    } else if (litersFuel < 25 && (typeFuel === "Diesel" || typeFuel === "Gasoline" || typeFuel === "Gas")) {
        console.log(`Fill your tank with ${lowerCaseTypeFuel}!`);
    } else if (typeFuel !== "Diesel" || typeFuel !== "Gasoline" || typeFuel !== "Gas") {
        console.log("Invalid fuel!");
    }
}
fuelTank(["Diesel", "10"]);
