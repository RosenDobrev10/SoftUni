function footballResults(input){
    let index = 0
    let firstGame = input[index++]
    let secondGame = input[index++]
    let thirdGame = input[index++]
    let wins = 0
    let draws = 0
    let losses = 0
    
    if (firstGame.charAt(0) > firstGame.charAt(2)){
        wins++
    } else if (firstGame.charAt(0) === firstGame.charAt(2)){
        draws++
    } else if ( firstGame.charAt(0) < firstGame.charAt(2)){
        losses++
    }
if (secondGame.charAt(0) > secondGame.charAt(2)){
    wins++
} else if (secondGame.charAt(0) === secondGame.charAt(2)){
    draws++
} else if ( secondGame.charAt(0) < secondGame.charAt(2)){
    losses++
}
if (thirdGame.charAt(0) > thirdGame.charAt(2)){
    wins++
} else if (thirdGame.charAt(0) === thirdGame.charAt(2)){
    draws++
} else if ( thirdGame.charAt(0) < thirdGame.charAt(2)){
    losses++
}
console.log(`Team won ${wins} games.`)
console.log(`Team lost ${losses} games.`)
console.log(`Drawn games: ${draws}`)
}
footballResults(["0:2",
"0:1",
"3:3"])