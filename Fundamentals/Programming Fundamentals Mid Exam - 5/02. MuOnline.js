function muOnline(input){

    let bitcoins = 0                // Правим брояч на събраните монети 
    let health = 100                // Започваме със 100 кръв 
    let rooms = input.split("|")    // Намираме си стаите, през които трябва да минем 


    for (let i = 0; i < rooms.length; i++){ // Правим цикъл да обиколим всички стаи 

        let currentCommand = rooms[i].split(" ")    // Текущата ни команда я делим по разстояние 
        let command = currentCommand[0]             // На нулевия индекса е Potion, Chest или MonsterName 
        let number = Number(currentCommand[1])      // на първи индекс е стойността 

        switch(command){
            case "potion":
                let currentHealth = health          // Запазваме в променлива кръвта преди взимането на кръв 
                health += number                    // Добавяме намерената кръв към сегашната ни 
                if (health > 100){                  // Ако кръвта ни стане повече от 100
                    health = 100                    // я връщаме обратно на 100 
                }
                if ( 100 - currentHealth > 0 ) {    // Ако след като сме взели кръвта не сме прескочили 100 
                    console.log(`You healed for ${health - currentHealth} hp.`) // кръвта, която сме взели е сегашната ни кръв - предишната кръв 
                } else {                                                       // Ако с кръвта, която сме взели сме прескочили 100 
                    console.log(`You healed for ${100 - currentHealth} hp.`)   // от 100 изваждаме кръвта, която сме имали преди това 
                }
                console.log(`Current health: ${health} hp.`)    // Печатаме текущата ни кръв 
                break;
            case "chest":
                bitcoins += number                              // Добавяме към събраните монети намерените в ковчежето 
                console.log(`You found ${number} bitcoins.`)    // Изписваме колко монети сме намерили 
                break;
            default:                                            // В останалите случаи винаги е чудовище 
                if ( health - number > 0){                      // Ако от кръвта ни извадим атаката му и е повече от 0 
                    health -= number                            // Вадим атаката му от кръвта ни 
                    console.log(`You slayed ${command}.`)       // И сме го победили 
                } else {                                        // Ако от кръвта ни извадим атаката му и тя е по-малко или равна на 0 
                    console.log(`You died! Killed by ${command}.`)  // Убити сме от чудовището 
                    console.log(`Best room: ${i + 1}`)              // И сме достигнали до ниво 
                    return;
                }
                break;
        }
    }
    console.log("You've made it!")                                  // Ако сме преминали през всички стаи 
    console.log(`Bitcoins: ${bitcoins}`)
    console.log(`Health: ${health}`)
}
muOnline("rat 10|bat 20|potion 40|potion 10|chest 100|boss 70|chest 1000")
//muOnline("cat 10|potion 30|orc 10|chest 10|snake 25|chest 110")