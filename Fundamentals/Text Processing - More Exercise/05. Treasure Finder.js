function treasureFinder(input){

    let key = input.shift().split(" ")                          // Взимаме си ключа от масива 

    while (input[0] !== 'find'){                                // Докато получим find въртим цикъл 
        let string = input.shift()                              // Взимаме стринга 
        let decrypted = ''                                      // Правим си променлива да пазим декриптираното съобщение 
        let count = 0                                           // Правим брояч за преминаването през стринга

        while (count < string.length){                          // Докато не свърши стринга минаваме през него 

            for (let j = 0; j < key.length; j++){               // Минаваме през ключа 
                if (count === string.length){                   // Ако брояча стане равен на дължината на стринга
                    break;                                      // прекъсваме цикъла и минаваме на следващата дума 
                }
                let currentNumber = Number(key[j])              // Взимаме текущото число от масива с ключа
                let currentChar = string[count].charCodeAt()    // Взимаме от стринга буквата и я правим на число 
                count++                                        // След всяко взимане на буква от стринга, минаваме на следващата
                let decryptedChar = String.fromCharCode(currentChar - currentNumber)  // Изваждаме декриптираната буква 
                decrypted += decryptedChar                      // Добавяме декриптираната буква към декриптираното съобщение 

            }
            
        }

        let firstIndexType = decrypted.indexOf('&')             // Намираме първия индекс, на който се намира & 
        let lastIndexType = decrypted.lastIndexOf('&')          // Намираме последния индекс, на който се намира & 
        let typeTreasure = decrypted.substring(firstIndexType + 1, lastIndexType)
        // Взимаме от декриптираното съобщение, дума от следващия символ на & до последния индекс, на който намерим &
        let firstIndexCoordinates = decrypted.indexOf('<')      // Намираме първия индекс, на който се намира < 
        let lastIndexCoordinates = decrypted.lastIndexOf('>')   // Намираме последния индекс, на който се намира > 
        let coordinates = decrypted.substring(firstIndexCoordinates + 1, lastIndexCoordinates)
        // Взимаме от декриптираното съобщение, дума от следващия символ на < до последния индекс, на който намерим >
        console.log(`Found ${typeTreasure} at ${coordinates}`) // Печатаме, типа и координатите 
        
    }

}
treasureFinder(['1 2 1 3',
"ikegfp'jpne)bv=41P83X@",
"ujfufKt)Tkmyft'duEprsfjqbvfv=53V55XA",
'find'])