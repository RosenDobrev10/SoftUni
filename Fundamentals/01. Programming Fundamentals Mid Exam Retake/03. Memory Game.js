function memoryGame(input){

    let sequenceOfNumbers = input.shift().split(" ")
    let moves = 0
    
    while (input[0] !== "end"){
        moves++
        let command = input.shift().split(" ")
        let index1 = Number(command[0])
        let index2 = Number(command[1])
        let length = sequenceOfNumbers.length

        if (index1 === index2 || index1 < 0 || index2 < 0 || index1 >= length || index2 >= length){
            sequenceOfNumbers.splice(length / 2, 0, `-${moves}a`, `-${moves}a`)
            console.log("Invalid input! Adding additional elements to the board")
        } else if (sequenceOfNumbers[index1] === sequenceOfNumbers[index2]){
            console.log(`Congrats! You have found matching elements - ${sequenceOfNumbers[index1]}!`)
            if (index1 > index2){
                sequenceOfNumbers.splice(index1, 1)
                sequenceOfNumbers.splice(index2, 1)
            } else {
                sequenceOfNumbers.splice(index2, 1)
                sequenceOfNumbers.splice(index1, 1)
            }
        } else if (sequenceOfNumbers[index1] !== sequenceOfNumbers[index2]){
            console.log("Try again!")
    
        }
        if (sequenceOfNumbers.length === 0){
            console.log(`You have won in ${moves} turns!`)
            return;
        }  
    }

    console.log("Sorry you lose :(")
    console.log(sequenceOfNumbers.join(" "))
}
//memoryGame( ["1 1 2 2 3 3 4 4 5 5", "1 0","-1 0","1 0", "1 0", "1 0", "end"])
//memoryGame(["a 2 4 a 2 4", "0 3", "0 2","0 1","0 1", "end"])
memoryGame([ "a 2 4 a 2 4", '6 0', "end"])
    