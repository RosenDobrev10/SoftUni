function gladiatorInventory(array) {
    let inventory = array.shift().split(" ");
    for (let line of array) {
        let [command, equipment] = line.split(" ");
        if (command === "Buy" && !inventory.includes(equipment)) {
            inventory.push(equipment);
        } else if (command === "Trash" && inventory.includes(equipment)) {
            inventory.splice(inventory.indexOf(equipment), 1);
        } else if (command === "Repair" && inventory.includes(equipment)) {
            inventory.push(inventory.splice(inventory.indexOf(equipment), 1)[0]);
        } else if (
            command === "Upgrade" && inventory.includes(equipment.split("-")[0])) {
            let upgradedEquipment = equipment.split("-")[0];
            let upgrade = equipment.split("-")[1];
            inventory.splice(inventory.indexOf(upgradedEquipment) + 1, 0, `${upgradedEquipment}:${upgrade}`);
        }
    }
    console.log(inventory.join(" "));
}
