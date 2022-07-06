function memoryGame(input){

    let sequenceOfNumbers = input.shift().split(" ")    // Взимаме нашата редица от числа, разделяме ги по интервал 
    let moves = 0                                       // Правим брояч за ходовете на играта 
    
    while (input[0] !== "end"){                         // Докато не получим команда end въртим по командите 
        moves++                                         // увеличаваме ходовете на игра с едно всеки път 
        let command = input.shift().split(" ")          // взимаме командата и я разделяме по интервал
        let index1 = Number(command[0])                 // нулевия индекс от командата е индекс1
        let index2 = Number(command[1])                 // първия индекс от командата е индекс2
        let length = sequenceOfNumbers.length           // Взимаме си дължината на поредицата от числа

        if (index1 === index2 || index1 < 0 || index2 < 0 || index1 >= length || index2 >= length){ // Проверяваме дали индексите са еднакви или са извън стойностите на поредицата 
            sequenceOfNumbers.splice(length / 2, 0, `-${moves}a`, `-${moves}a`) // Ако са ги добавяме в средата на нашата поредица, 2 пъти 
            console.log("Invalid input! Adding additional elements to the board")   // Печатаме съобщение 
        } else if (sequenceOfNumbers[index1] === sequenceOfNumbers[index2]){        // Ако самите стойности на дадените индекси са еднакви 
            console.log(`Congrats! You have found matching elements - ${sequenceOfNumbers[index1]}!`)   // Печатаме съобщение, че сме намерили съвпадащи стойности  
            if (index1 > index2){                   // Ако индекс 1 е по-голямо  индекс 2 
                sequenceOfNumbers.splice(index1, 1) // Първо махаме индекс 1, за да не разместим подредбата 
                sequenceOfNumbers.splice(index2, 1) // после махаме индекс 2
            } else {                                // Ако индекс 2 е по-голямо индекс 1
                sequenceOfNumbers.splice(index2, 1) // Първо махаме индекс 2, за да не разместим подредбата
                sequenceOfNumbers.splice(index1, 1) // после махаме индекс 1
            }
        } else if (sequenceOfNumbers[index1] !== sequenceOfNumbers[index2]){    // Ако стойностите на дадените индекси са различни 
            console.log("Try again!")                                           // Печатаме съобщение за нов опит 
    
        }
        if (sequenceOfNumbers.length === 0){                            // Ако в някакъв момент открием всички двойки стойности
            console.log(`You have won in ${moves} turns!`)              // Печатаме за колко хода сме го направили 
            return;                                                     // и приключваме програмата 
        }  
    }

    console.log("Sorry you lose :(")                                // Ако след идването на end, не сме намерили двойките стойности
    console.log(sequenceOfNumbers.join(" "))                        // печатаме редицата 
}
//memoryGame( ["1 1 2 2 3 3 4 4 5 5", "1 0","-1 0","1 0", "1 0", "1 0", "end"])
//memoryGame(["a 2 4 a 2 4", "0 3", "0 2","0 1","0 1", "end"])
memoryGame([ "a 2 4 a 2 4", '6 0', "end"])
    