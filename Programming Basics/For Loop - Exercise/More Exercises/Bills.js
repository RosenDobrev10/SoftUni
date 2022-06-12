function bills(input) {
    let index = 0;
    let months = Number(input[index++]);
    let electricity = 0;
    let water = months * 20;
    let internet = months * 15;
    let other = 0;

    for (let i = 0; i < months; i++) {
        currentElectricity = Number(input[index++]);
        electricity += currentElectricity;
        other += (20 + 15 + currentElectricity) * 1.2;
    }
    let averageBills = (electricity + water + internet + other) / months;
    console.log(`Electricity: ${electricity.toFixed(2)} lv`);
    console.log(`Water: ${water.toFixed(2)} lv`);
    console.log(`Internet: ${internet.toFixed(2)} lv`);
    console.log(`Other: ${other.toFixed(2)} lv`);
    console.log(`Average: ${averageBills.toFixed(2)} lv`);
}
bills(["5", "68.63", "89.25", "132.53", "93.53", "63.22"]);
