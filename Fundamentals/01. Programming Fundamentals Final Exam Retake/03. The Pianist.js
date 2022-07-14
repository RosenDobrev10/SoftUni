function thePianist(input) {

    let n = Number(input.shift());                              // Намираме броя песни, които трябва да добавим в колекцията 
    let songList = {};                                          // Правим празен обект, в който да добавяме песните 

    for (let i = 0; i < n; i++) {                               // Минаваме по броя на песните 
        let [piece, composer, key] = input.shift().split("|");  // Вадим песента, композитора и ключа от инпута
        songList[piece] = { composer, key };                    // Създаваме обект със свойство името на песента и value композитора и ключа
    }

    while (input[0] !== "Stop") {                               // Минаваме по останалите елементи от инпута 
        let line = input.shift().split("|");                    // Вадим всяка линията и е делим по |
        let command = line[0];                                  // Командата е на нулев индекс от линията 
        let piece = line[1];                                    // Песента е на първи индекс от линията

        if (command === "Add") {                                // Ако командата е Add 
            let composer = line[2];                             // Композитора е на втори индекс от линията
            let key = line[3];                                  // Ключа е на трети индекс от линията
            if (songList.hasOwnProperty(piece)) {               // Ако песента я ИМА в обекта с песни 
                console.log(`${piece} is already in the collection!`);  // Печатаме 
            } else {                                            // Ако песента я НЯМА в обекта с песни
                songList[piece] = { composer, key };            // Създаваме ново свойство с името на песента 
                console.log(`${piece} by ${composer} in ${key} added to the collection!`);  // Печатаме 
            }

        } else if (command === "Remove") {                      // Ако командата е Remove
            if (songList.hasOwnProperty(piece)) {               // Ако песента я ИМА в обекта с песни 
                console.log(`Successfully removed ${piece}!`);  // Печатаме
                delete songList[piece];                         // Изтриваме песента от обекта 
            } else {                                            // Ако песента я НЯМА в обекта с песни
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);   // Печатаме
            }

        } else if (command === "ChangeKey") {                   // Ако командата е ChangeKey
            let newKey = line[2];                               // Новия ключ е на втори индекс от линията 
            if (songList.hasOwnProperty(piece)) {               // Ако песента я ИМА в обекта с песни
                songList[piece].key = newKey;                   // Променяме ключа на песента с новия ключ
                console.log(`Changed the key of ${piece} to ${newKey}!`);   // Печатаме 
            } else {                                            // Ако песента я НЯМА в обекта с песни
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);   // Печатаме
            }
        }

    }

    for (let song of Object.entries(songList)) {                // Минаваме по всяка песен, като превръщаме обекта в масив 
        console.log(`${song[0]} -> Composer: ${song[1].composer}, Key: ${song[1].key}`);
        // на нулев индекс е името на песента, на първи индекс е обекта с композитора и ключа и ги достъпваме 
    }
    
}
thePianist([
"3",
"Fur Elise|Beethoven|A Minor",
"Moonlight Sonata|Beethoven|C# Minor",
"Clair de Lune|Debussy|C# Minor",
"Add|Sonata No.2|Chopin|B Minor",
"Add|Hungarian Rhapsody No.2|Liszt|C# Minor",
"Add|Fur Elise|Beethoven|C# Minor",
"Remove|Clair de Lune",
"ChangeKey|Moonlight Sonata|C# Major",
"Stop",]);