function manOWar(arr) {
    let pirateShip = arr.shift().split(">").map(Number);
    let warShip = arr.shift().split(">").map(Number);
    let maxHealth = Number(arr.shift());
    while (arr[0] !== "Retire") {
        let [command, param1, param2, param3] = arr.shift().split(" ");
        param1 = Number(param1);
        param2 = Number(param2);
        param3 = Number(param3);
        if (command === "Fire" && warShip[param1] !== undefined) {
            warShip[param1] -= param2;
            if (warShip[param1] <= 0) {
                return console.log("You won! The enemy ship has sunken.");
            }
        } else if (command === "Defend" && pirateShip[param1] !== undefined && pirateShip[param2] !== undefined) {
            for (let i = param1; i <= param2; i++) {
                pirateShip[i] -= param3;
                if (pirateShip[i] <= 0) {
                    return console.log("You lost! The pirate ship has sunken.");
                }
            }
        } else if (command === "Repair" && pirateShip[param1] !== undefined) {
            pirateShip[param1] += param2;
            pirateShip[param1] > maxHealth ? (pirateShip[param1] = maxHealth) : null;
        } else if (command === "Status") {
            let repairSections = pirateShip.filter((x) => x < maxHealth * 0.2);
            console.log(`${repairSections.length} sections need repair.`);
        }
    }
    console.log(`Pirate ship status: ${pirateShip.reduce((a, b) => a + b)}`);
    console.log(`Warship status: ${warShip.reduce((a, b) => a + b)}`);
}
