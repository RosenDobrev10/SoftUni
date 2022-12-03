function plantDiscovery(input) {
    const plants = {};
    const numberOfPlants = Number(input.shift());
    for (let i = 0; i < numberOfPlants; i++) {
        const [plant, rarity] = input.shift().split("<->");
        plants[plant] = { rarity: Number(rarity), rating: [] };
    }
    while (input[0] !== "Exhibition") {
        let [command, plantData] = input.shift().split(": ");
        let [plant, ratingOrRarity] = plantData.split(" - ");
        ratingOrRarity = Number(ratingOrRarity);
        if (command === "Rate") {
            plants[plant] ? plants[plant].rating.push(ratingOrRarity) : console.log("error");
        } else if (command === "Update") {
            plants[plant] ? (plants[plant].rarity = ratingOrRarity) : console.log("error");
        } else if (command === "Reset") {
            plants[plant] ? (plants[plant].rating = []) : console.log("error");
        }
    }
    console.log("Plants for the exhibition:");
    for (let plant in plants) {
        const length = plants[plant].rating.length;
        let averageRating = 0;
        length ? (averageRating = plants[plant].rating.reduce((a, b) => a + b, 0) / length) : null;
        console.log(`- ${plant}; Rarity: ${plants[plant].rarity}; Rating: ${averageRating.toFixed(2)}`);
    }
}
