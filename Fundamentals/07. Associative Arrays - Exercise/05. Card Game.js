function cardGame(input){

    let colors = { "C" : 1 , "D" : 2, "H" : 3, "S" : 4} // Създаваме си обект, в който ще пазим силата на боите 
    let powers = { "1" : 10, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9,
     "J" : 11, "Q" : 12, "K" : 13, "A" : 14,}       // Създаваме си обект, в който ще пазим силата на картата
    let players = {}                                // Създаваме си обект, в който ще слагаме нашите играчи 

    for (let element of input) {                    // Взимаме всеки елемент от инпута
        let [player, cards] = element.split(": ")   // на нулевия индекс е играча, а на първи индекс са картите му 
        cards = cards.split(", ")                   // сами карти ги делим, за да станат на масив 
        if (!players.hasOwnProperty(player)){       // Ако няма такъв играч до сега, го създаваме като нов СЕТ 
            players[player] = new Set()
        }

        for (let card of cards){                    // Минаваме по масива с карти на играча 
        players[player].add(card)                   // И всяка карта я добавяме към предишните му, СЕТ не добавя повтарящи елементи 
        }

    }

    for (let [player, cards] of Object.entries(players)){       // Минаваме по играчите и техните карти 
        let cardsPower = 0                       // Правим променлива, в която ще изчисляваме силата на картите му 

        for (let card of cards){                    // минаваме по всяка карта от картите му 
            let power = powers[card[0]]             // на първи индекс е силата на картата му 
            let color = colors[card.slice(-1)]      // на последен индекс е боята на картата му 
            cardsPower += power * color             // Изчисляваме силатата на картата му и я добавяме към общата сила на картите
        }

        console.log(`${player}: ${cardsPower}`)     // Накрая печатаме името и силата на картите 
    }

}
cardGame([
'Peter: 2C, 4H, 9H, AS, QS',
'Tomas: 3H, 10S, JC, KD, 5S, 10S',
'Andrea: QH, QC, QS, QD',
'Tomas: 6H, 7S, KC, KD, 5S, 10C',
'Andrea: QH, QC, JS, JD, JC',
'Peter: JD, JD, JD, JD, JD, JD' 
])

// cardGame([
// 'John: 2C, 4H, 9H, AS, QS',
// 'Slav: 3H, 10S, JC, KD, 5S, 10S',
// 'Alex: 6H, 7S, KC, KD, 5S, 10C',
// 'Thomas: QH, QC, JS, JD, JC',
// 'Slav: 6H, 7S, KC, KD, 5S, 10C',
// 'Thomas: QH, QC, JS, JD, JC',
// 'Alex: 6H, 7S, KC, KD, 5S, 10C',
// 'Thomas: QH, QC, JS, JD, JC',
// 'John: JD, JD, JD, JD'
// ])
