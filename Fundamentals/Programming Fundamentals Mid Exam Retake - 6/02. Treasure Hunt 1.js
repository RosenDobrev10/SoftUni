function treasureHunt(arr) {
    let chest = arr.shift().split("|");
    while (arr[0] !== "Yohoho!") {
        let line = arr.shift().split(" ");
        let command = line.shift();
        if (command === "Loot") {
            for (let item of line) {
                !chest.includes(item) ? chest.unshift(item) : null;
            }
        } else if (command === "Drop") {
            if (chest[line[0]] !== undefined) {
                let removedItem = chest.splice(line[0], 1);
                chest.push(removedItem[0]);
            }
        } else if (command === "Steal") {
            let removedItems = chest.splice(-line[0]);
            console.log(removedItems.join(", "));
        }
    }
    if (chest.length === 0) {
        console.log(`Failed treasure hunt.`);
    } else {
        let sum = 0;
        chest.forEach((item) => (sum += item.length));
        console.log(`Average treasure gain: ${(sum / chest.length).toFixed(2)} pirate credits.`);
    }
}
