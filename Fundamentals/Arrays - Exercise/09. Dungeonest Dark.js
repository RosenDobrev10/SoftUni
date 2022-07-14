function dungeonestDark(array){
    let health = 100
    let coins = 0

    let isDead = false                  // Правим променлива, с която засичаме кога сме умрели 
    let level = 0                       // Правим брояч за стаята, до която сме достигнали 
    let allRooms = array[0].split("|")  // Разделяме масива на отделни стаи по сепаратор | 

    for (let index = 0; index < allRooms.length; index++) { // Правим цикъла да минем през всички стаи, освен ако не умрем
        let room = allRooms[index].split(" ")    // Разделяме масива с всички стаи на отделни, всеки път когато минаваме през цикъла 
        level++

            if (room[0] === "potion"){             // Проверяваме какво има в стаята чрез нулевия индекс
            let takenPotion = Number(room[1])      // Текущата кръв, която намираме като число
                if (health <= 100){             // Ако кръвта ни до момента е по-малко от 100, можем да я вземем 
                    if (health + takenPotion >=100 ){ // Ако сбора на текущата и взетата е повече от 100, не можем да вземем цялата
                        takenPotion = 100 - health  // Взетата кръв е максималната минус текущата кръв 
                        health = 100                // Ако надвишим 100 кръв, трябва да не е повече а да е пак 100
                    } else {                        // Ако кръвта ни е по-малко от 100 и можем да вземем цялата 
                        health += takenPotion       // Допълваме към текущата кръв, толкова колкото сме намерили
                    }
                }
            console.log(`You healed for ${takenPotion} hp.`)
            console.log(`Current health: ${health} hp.`)
            } else if (room[0] === "chest"){                 // Проверяваме какво има в стаята чрез нулевия индекс
            let currentCoins = Number(room[1])               // Текущите монети, които намираме като число
                coins += currentCoins                        // Добавяме ги към досегашните ни 
            console.log(`You found ${currentCoins} coins.`)
            } else {                                        // Проверяваме какво има в стаята чрез нулевия индекс
            let currentMonster = room[0]                    // Чудовището което срещаме 
            let monsterAttack = Number(room[1])             // Атаката на чудовището като число 
                health -= monsterAttack                     // От текущата ни кръв вадим атаката на чудовището
                if ( health > 0){                           // Ако кръвта ни е повече от 0(не сме умрели)
                    console.log(`You slayed ${currentMonster}.`)
                } else {                                    // Ако кръвта ни е станала 0 или по-малко сме умрели              
                    isDead = true                           // Умрели сме 
                    console.log(`You died! Killed by ${currentMonster}.`)
                    console.log(`Best room: ${level}`)
                    break;         //  Прекъсваме цикъла 
                }
            }
    }

    if (!isDead){
        console.log("You've made it!")
        console.log(`Coins: ${coins}`)
        console.log(`Health: ${health}`)
    }
}
//dungeonestDark(["rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000"])
dungeonestDark(["cat 10|potion 30|orc 10|chest 10|snake 25|chest 110"])
