function inventory(arr) {
    let inventory = arr.shift().split(", ");
    while (arr[0] !== "Craft!") {
        let [command, item] = arr.shift().split(" - ");
        if (command === "Collect" && !inventory.includes(item)) {
            inventory.push(item);
        } else if (command === "Drop" && inventory.includes(item)) {
            inventory.splice(inventory.indexOf(item), 1);
        } else if (command === "Combine Items") {
            let [oldItem, newItem] = item.split(":");
            inventory.includes(oldItem) ? inventory.splice(inventory.indexOf(oldItem) + 1, 0, newItem) : null;
        } else if (command === "Renew" && inventory.includes(item)) {
            inventory.splice(inventory.indexOf(item), 1);
            inventory.push(item);
        }
    }
    console.log(inventory.join(", "));
}
