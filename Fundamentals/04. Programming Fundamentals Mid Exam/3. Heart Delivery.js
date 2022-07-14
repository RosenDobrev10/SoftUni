function heartDelivery(array){

    let houses = array.shift().split("@").map(Number) // Взимаме Къщите от първия елемент, махаме @ и ги правим на числа 
    let currentPosition = 0             // Началната позиция е 0 
    let houseCount = houses.length      // Началния брой къщи е толкова колкото е дължината на масива с къщите 

    while (array[0] !== "Love!"){
        let currentCommand = array.shift().split(" ")
        let length = Number(currentCommand[1])          // Взимаме дължината на скока на Купидон

        currentPosition += length                       // Моментната позиция е предишната + дължината на скока 
        if (currentPosition >= houses.length){          // Ако позицията, надвиши броя на къщите 
            currentPosition = 0                         // минава на първата
        }

        if (houses[currentPosition] === 0){             // Ако попадне на къща, която е занулена вече 
            console.log(`Place ${currentPosition} already had Valentine's day.`);   // Печатаме това 
        } else {                                        // Ако попадне на къща, която не е занулена 
            houses[currentPosition] -= 2                // От дадената къща изваждаме 2 сърца 
            if (houses[currentPosition] === 0 ){        // Ако броя на сърцата в текущата къща стигне 0 
                console.log(`Place ${currentPosition} has Valentine's day.`);   // печатаме това 
                houseCount--                                                    // Намаляме броя на къщите с една 
            }
        }

    }
    console.log(`Cupid's last position was ${currentPosition}.`)    // Винаги печатаме къде е приключил Купидон 

    if (houseCount === 0){                      // Ако броя на къщите е равен на 0 
    console.log("Mission was successful.")      // Значи всички къщи са занулени 
    } else {                                    // Ако броя на къщите НЕ Е 0 
    console.log(`Cupid has failed ${houseCount} places.`)   // Печатаме колко къщи са останали 
    }
}
//heartDelivery(["2@4@2","Jump 2","Jump 2","Jump 8","Jump 3","Jump 1","Love!"])
//heartDelivery(["10@10@10@2", "Jump 1", "Jump 2", "Love!"])
heartDelivery(["4@2@4@2", "Jump 1", "Jump 2", "Jump 1", "Jump 2", "Jump 2", "Jump 2", "Love!"])