function tseamAccount(array){

    let peterAccountGames = []      // Правим си празен масив
    let shifted = array.shift()     // Изваждаме от нашият масив, игрите на Peter под формата на стринг
    peterAccountGames.push(shifted) // Добавяме си към празния масив, игрите на Peter
    peterAccountGames = peterAccountGames[0].split(" ") // Разделяме игрите, за да станат отделни елементи 
    let index = 0                   // правим си индекс 
    let command = array[index++]    // Взимаме командата от индекса и увеличаваме, за да вземем следващия път следваща команда 

    while (command !== "Play!"){    // Докато командата не е продължаваме да въртим цикъла 
        let FirstElement = command.split(" ")   // Разделяме командата на командата и игра
        let commandGame = FirstElement[0]    // Команда
        let game = FirstElement[1]          // Игра
         
        switch(commandGame){    // Правим switch по команда 
            case "Install":     // Ако командатата е Install
                if (peterAccountGames.includes(game)){      // Проверяваме дали играта я има в колекцията  
                    break;                                  // Ако я има прекъсваме цикъла и не правим нищо
                }
                else {                                      // Ако играта я няма
                    peterAccountGames.push(game)            // я добавяме към колекцията в края и 
                }
                break;
            case "Uninstall":       // Ако командата е Uninstall 
                let indexUninstall = peterAccountGames.indexOf(game)    // Намираме индекса на играта, която трябва да деинсталираме
                if (peterAccountGames.includes(game)){              // Проверяваме дали играта я има в колекцията 
                    peterAccountGames.splice(indexUninstall,1)      // Ако я има, деинсталираме играта като посочваме къде се намира по индекс 
                }                                                   // числото 1 показва колко елемента от масива искаме да махнем 
                break;
            case "Update":                  // Ако командата е Update 
                let indexUpdate = peterAccountGames.indexOf(game)   // Намираме индекса на играта, която трябва да ъпдейтнем
                if (peterAccountGames.includes(game)){          // Проверяваме дали играта я има в колекцията 
                    peterAccountGames.splice(indexUpdate, 1)    // Ако я има, махаме играта от индекса ,на който сме я намерили
                    peterAccountGames.push(game)                // и я добавяме накрая на колекцията 
                }
                break;
            case "Expansion":       // Ако командата е Expansion
                let expansionGame = game.split("-") // Разделяме играта по сепаратор "-"
                game = expansionGame[0]             // На нулевия индекс се намира името на играта и го присвояваме на game 
                let expansion = expansionGame[1]    // на първи индекс се намира името на expansion и го взимаме като променлива 
                let indexExpansion = peterAccountGames.indexOf(game)    // Намираме индекса на играта, която трябва да се добави expansion
                if (peterAccountGames.includes(game)){  // Ако играта я има в колекцията
                    peterAccountGames.splice(indexExpansion + 1, 0 , `${game}:${expansion}`) // на индекса + 1(След индекса на играта)
                }                                           // 0 = не трием нищо от колекцията, а добавяме името на играта и expansion-a 
                }
         command = array[index++]   // подменяме стойността на командата 
     }
     console.log(peterAccountGames.join(" "))   // Печатаме колекцията от игри разделена от интервал 
}

tseamAccount(
['CS WoW Diablo',

'Install LoL',

'Uninstall WoW',

'Update Diablo',

'Expansion CS-Go',

'Play!'])

tseamAccount(
['CS WoW Diablo',

'Uninstall XCOM',

'Update PeshoGame',

'Update WoW',

'Expansion Civ-V',

'Play!'])