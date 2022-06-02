function poolDay(input) {
    let people = Number(input[0]);
    let tax = Number(input[1]);
    let sunbed = Number(input[2]);
    let umbrella = Number(input[3]);

    let taxCost = people * tax;
    let sunbedCost = Math.ceil(0.75 * people) * sunbed;
    let umbrellaCost = Math.ceil(people / 2) * umbrella;
    let allCost = taxCost + sunbedCost + umbrellaCost;
    console.log(`${allCost.toFixed(2)} lv.`);
}
poolDay(["50", "6", "8", "4"]);
