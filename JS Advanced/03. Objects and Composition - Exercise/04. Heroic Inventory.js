function heroicInventory(array) {
    
    let heroes = [];

    for (let line of array) {
        let [name, level, items] = line.split(" / ");
        level = Number(level);
        items = items ? items.split(", ") : [];

        heroes.push({ name, level, items });
    }

    console.log(JSON.stringify(heroes));
}
heroicInventory([
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara",
]);
