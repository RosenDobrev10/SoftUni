function inventory(input) {

    let inventory = input.shift().split(", ")   // Нашия инвентар го взимаме от масива и го делим по запетая и интервал 
    
    while (input[0] !== "Craft!"){              // Докато не дойде команда Craft!, въртим цикъла 
        let currentCommand = input.shift().split(" - ") // Разделяме текущата команда по интервал, тире и интервал 
        let command = currentCommand[0]                 // командата е на нулев индекс 
        let item = currentCommand[1]                    // на първи индекс е предмета 
        
        if (command === "Collect" && !inventory.includes(item)){    // Ако командата е Collect и нямаме предмета в инвентара си 
            inventory.push(item)                                    // Го добавяме накрая 
        } else if (command === "Drop" && inventory.includes(item)){ // Ако командата е Drop и имаме предмета в инвентара си 
            let indexOfItem = inventory.indexOf(item)               // Намираме на кой индекс се намира в инвентара 
            inventory.splice(indexOfItem, 1)                        // И го трием от там 
        } else if ( command === "Combine Items"){                   // Ако командата е Combine Items 
            let oldNew = item.split(":")                            // самия предмет го делим на стар и нов предмет 
            let oldItem = oldNew[0]                                 // на нулев индекс е стария предмет 
            let newItem = oldNew[1]                                 // на първи индекс е новия предмет 
            let indexOfItem = inventory.indexOf(oldItem)            // Намираме на кой индекс е намира, стария предмет 
            if (inventory.includes(oldItem)){                       // Ако стария предмет е в инвентара 
                inventory.splice(indexOfItem + 1, 0, newItem)       // След него добавяме и новия предмет 
            }
        } else if (command === "Renew" && inventory.includes(item)){    // Ако командата е Renew и имаме предмета 
            let indexOfItem = inventory.indexOf(item)                   // Намираме на кой индекс се намира предмета 
            inventory.splice(indexOfItem, 1)                            // Трием го от този индекс 
            inventory.push(item)                                        // и го добавяме накрая като подновен 
        }
    }
    console.log(inventory.join(", "))
}
inventory(["Iron, Wood, Sword", "Collect - Gold", "Drop - Wood", "Craft!"]);
//inventory([ "Iron, Sword", "Drop - Bronze", "Combine Items - Sword:Bow", "Renew - Iron", "Craft!"]);