function pirates(input) {
    const targetCities = {};
    while (input[0] !== "Sail") {
        const [city, population, gold] = input.shift().split("||");
        if (!targetCities[city]) {
            targetCities[city] = { population: 0, gold: 0 };
        }
        targetCities[city].population += Number(population);
        targetCities[city].gold += Number(gold);
    }
    while (input[0] !== "End") {
        let [command, town, people, gold] = input.shift().split("=>");
        if (command === "Plunder") {
            targetCities[town].population -= Number(people);
            targetCities[town].gold -= Number(gold);
            console.log(`${town} plundered! ${gold} gold stolen, ${people} citizens killed.`);
            if (targetCities[town].population <= 0 || targetCities[town].gold <= 0) {
                delete targetCities[town];
                console.log(`${town} has been wiped off the map!`);
            }
        } else if (command === "Prosper") {
            gold = Number(people);
            if (gold < 0) {
                console.log("Gold added cannot be a negative number!");
            } else {
                targetCities[town].gold += gold;
                console.log(`${gold} gold added to the city treasury. ${town} now has ${targetCities[town].gold} gold.`);
            }
        }
    }
    const numberOfCities = Object.keys(targetCities).length;
    if (numberOfCities === 0) {
        return console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
    }
    console.log(`Ahoy, Captain! There are ${numberOfCities} wealthy settlements to go to:`);
    for (let city in targetCities) {
        console.log(`${city} -> Population: ${targetCities[city].population} citizens, Gold: ${targetCities[city].gold} kg`);
    }
}
