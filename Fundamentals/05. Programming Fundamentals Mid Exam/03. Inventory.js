function inventory(input) {

    let inventory = input.shift().split(", ")
    
    while (input[0] !== "Craft!"){
        let currentCommand = input.shift().split(" - ")
        let command = currentCommand[0]
        let item = currentCommand[1]
        
        if (command === "Collect" && !inventory.includes(item)){
            inventory.push(item)
        } else if (command === "Drop" && inventory.includes(item)){
            let indexOfItem = inventory.indexOf(item)
            inventory.splice(indexOfItem, 1)
        } else if ( command === "Combine Items"){
            let oldNew = item.split(":")
            let oldItem = oldNew[0]
            let newItem = oldNew[1]
            let indexOfItem = inventory.indexOf(oldItem)
            if (inventory.includes(oldItem)){
                inventory.splice(indexOfItem + 1, 0, newItem)
            }
        } else if (command === "Renew" && inventory.includes(item)){
            let indexOfItem = inventory.indexOf(item)
            inventory.splice(indexOfItem, 1)
            inventory.push(item)
        }
    }
    console.log(inventory.join(", "))
}
inventory(["Iron, Wood, Sword", "Collect - Gold", "Drop - Wood", "Craft!"]);
//inventory([ "Iron, Sword", "Drop - Bronze", "Combine Items - Sword:Bow", "Renew - Iron", "Craft!"]);