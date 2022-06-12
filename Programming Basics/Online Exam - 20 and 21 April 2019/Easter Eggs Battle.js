function easterEggsBattle(input){
    let index = 0
    let firstPlayerEggs = Number(input[index++])
    let secondPlayerEggs = Number(input[index++])
    let command = input[index++]

    while (command !== "End"){
        if (command === "one"){
            secondPlayerEggs--
        } else {
            firstPlayerEggs--
        }
        if (firstPlayerEggs === 0){
            console.log(`Player one is out of eggs. Player two has ${secondPlayerEggs} eggs left.`)
            break;
        } else if (secondPlayerEggs === 0){
            console.log(`Player two is out of eggs. Player one has ${firstPlayerEggs} eggs left.`)
            break;
        }
        command = input[index++]
    }
if (command === "End"){
console.log(`Player one has ${firstPlayerEggs} eggs left.`)
console.log(`Player two has ${secondPlayerEggs} eggs left.`)
}
}
easterEggsBattle(["5","4","one","two","one","two","two","End"])
