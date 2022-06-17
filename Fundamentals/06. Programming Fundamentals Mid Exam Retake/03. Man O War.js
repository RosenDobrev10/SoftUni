function manOWar(input){

    let pirateShip = input.shift().split(">").map(Number)
    let warShip = input.shift().split(">").map(Number)
    let maxHealth = Number(input.shift())

    while (input[0] !== "Retire"){
        let currentCommand = input.shift().split(" ")
        let command = currentCommand[0]

        switch(command){

            case "Fire":
                let indexFire = Number(currentCommand[1])
                let damageFire = Number(currentCommand[2])
                if (indexFire >= 0 && indexFire < warShip.length){
                    warShip[indexFire] -= damageFire
                    if (warShip[indexFire] <= 0){
                        console.log("You won! The enemy ship has sunken.")
                        return;
                    }
                }
                break;

            case "Defend":
                let startIndex = Number(currentCommand[1])
                let endIndex = Number(currentCommand[2])
                let damageDefend = Number(currentCommand[3])
                if (startIndex >= 0 && startIndex < pirateShip.length && endIndex >= 0 && endIndex < pirateShip.length){
                    if (startIndex > endIndex){
                        let tempIndex = startIndex
                        startIndex = endIndex
                        endIndex = tempIndex
                    }
                        for (let i = startIndex; i <= endIndex; i++){
                            pirateShip[i] -= damageDefend
                            if (pirateShip[i] <= 0){
                                console.log("You lost! The pirate ship has sunken.")
                                return;
                            }
                        }
                    }
                break;

            case "Repair":
                      let indexRepair = Number(currentCommand[1])
                      let health = Number(currentCommand[2])
                      if (indexRepair >= 0 && indexRepair < pirateShip.length){
                        pirateShip[indexRepair] += health
                        if (pirateShip[indexRepair] > maxHealth){
                            pirateShip[indexRepair] = maxHealth
                        }
                      }
                break;

            case "Status":
                      let criticalPoint = 0.2 * maxHealth
                      let sections = 0
                      for (let j = 0; j < pirateShip.length; j++){
                          if (pirateShip[j] < criticalPoint){
                              sections++
                          }
                      }
                      console.log(`${sections} sections need repair.`)
                break;

        }
    }
    let pirateShipSum = 0
    for (let sum of pirateShip){
        pirateShipSum += sum
    }

    let warshipSum = 0
    for (let sum of warShip){
        warshipSum += sum
    }

    console.log(`Pirate ship status: ${pirateShipSum}`)
    console.log(`Warship status: ${warshipSum}`)
}
manOWar((["12>13>11>20>66",
"12>22>33>44>55>32>18",
"70",
"Fire 2 11",
"Fire 8 100",
"Defend 3 6 11",
"Defend 3 0 5",
"Repair 1 33",
"Status",
"Retire"])
)
// manOWar((["2>3>4>5>2",
// "6>7>8>9>10>11",
// "20",
// "Status",
// "Fire 2 3",
// "Defend 0 4 11",
// "Repair 3 18",
// "Retire"])
// )