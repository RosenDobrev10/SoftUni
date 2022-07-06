function treasureHunt(input) {

    let initialLoot = input.shift().split("|")

    while (input[0] !== "Yohoho!"){
        let currentCommand = input.shift().split(" ")
        let command = currentCommand.shift()
            switch(command){
                case "Loot":
                    for (let item of currentCommand){
                        if (!initialLoot.includes(item)){
                            initialLoot.unshift(item)
                        }
                    }
                    break;
                case "Drop":
                    let index = currentCommand.shift()
                    if (index >= 0 && index < initialLoot.length){
                        let item = initialLoot[index]
                        initialLoot.splice(index, 1)
                        initialLoot.push(item)
                    }
                    break;
                case "Steal":
                    let count = currentCommand.shift()
                    let stolenItems = initialLoot.splice(-count)
                    console.log(stolenItems.join(", "))
                    break;
            }
        
    }
    if (initialLoot.length === 0){
        console.log("Failed treasure hunt.")
    } else {
        let sumLength = 0
        for (let items of initialLoot){
            sumLength += items.length
        }
        let averageGain = sumLength / initialLoot.length
        console.log(`Average treasure gain: ${averageGain.toFixed(2)} pirate credits.`)
    }
}
treasureHunt([
  "Gold|Silver|Bronze|Medallion|Cup",
  "Loot Wood Gold Coins",
  "Loot Silver Pistol",
  "Drop 3",
  "Steal 3",
  "Yohoho!",
]);
// treasureHunt([
//   "Diamonds|Silver|Shotgun|Gold",
//   "Loot Silver Medals Coal",
//   "Drop -1",
//   "Drop 1",
//   "Steal 6",
//   "Yohoho!",
// ]);
