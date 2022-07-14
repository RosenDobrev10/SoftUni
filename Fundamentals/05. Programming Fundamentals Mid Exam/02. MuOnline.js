function muOnline(input){

    let bitcoins = 0
    let health = 100
    let rooms = input.split("|")


    for (let i = 0; i < rooms.length; i++){

        let currentCommand = rooms[i].split(" ")
        let command = currentCommand[0]
        let number = Number(currentCommand[1])

        switch(command){
            case "potion":
                let currentHealth = health
                health += number
                if (health > 100){
                    health = 100
                }
                if ( 100 - currentHealth > 0 ) {
                    console.log(`You healed for ${health - currentHealth} hp.`)
                } else {
                    console.log(`You healed for ${100 - currentHealth} hp.`)
                }
                console.log(`Current health: ${health} hp.`)
                break;
            case "chest":
                bitcoins += number
                console.log(`You found ${number} bitcoins.`)
                break;
            default:
                if ( health - number > 0){
                    health -= number
                    console.log(`You slayed ${command}.`)
                } else {
                    console.log(`You died! Killed by ${command}.`)
                    console.log(`Best room: ${i + 1}`)
                    return;
                }
                break;
        }
    }
    console.log("You've made it!")
    console.log(`Bitcoins: ${bitcoins}`)
    console.log(`Health: ${health}`)
}
muOnline("rat 10|bat 20|potion 40|potion 10|chest 100|boss 70|chest 1000")
//muOnline("cat 10|potion 30|orc 10|chest 10|snake 25|chest 110")