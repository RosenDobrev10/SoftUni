function pcGameShop(input) {
    let index = 0
    let numberGames = input[index++]
    let counterHearthstone = 0
    let counterFornite = 0
    let counterOverwatch = 0
    let counterOthers = 0

    for (let i = 0; i < numberGames; i++) {
        let game = input[index++]
        if (game === "Hearthstone") {
            counterHearthstone++
        } else if (game === "Fornite") {
            counterFornite++
        } else if (game === "Overwatch") {
            counterOverwatch++
        } else {
            counterOthers++
        }
    }
    let pHearthstone = counterHearthstone / numberGames * 100
    let pFornite = counterFornite / numberGames * 100
    let pOverwatch = counterOverwatch / numberGames * 100
    let pOthers = counterOthers / numberGames * 100

    console.log(`Hearthstone - ${pHearthstone.toFixed(2)}%`)
    console.log(`Fornite - ${pFornite.toFixed(2)}%`)
    console.log(`Overwatch - ${pOverwatch.toFixed(2)}%`)
    console.log(`Others - ${pOthers.toFixed(2)}%`)

}
pcGameShop(["3",
    "Hearthstone",
    "Diablo 2",
    "Star Craft 2"])

