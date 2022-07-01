function activationKeys(input) {

    let activationKey = input.shift();                      // Изваждаме ключа

    while (input[0] !== "Generate") {                       // Докато не дойде Generate, въртим цикъла 
        let line = input.shift().split(">>>");              // Взимаме нашата линия и я сплитваме по >>>
        let command = line[0];                              // Командата е на нулев индекс 

        if (command === "Contains") {                       // Ако командата е Contains
            let substring = line[1];                        // на първи индекс е подстринга 
            if (activationKey.includes(substring)) {        // Ако го има в ключа този подстринг    
                console.log(`${activationKey} contains ${substring}`);  // печатаме, че го съдържа 
            } else {                                        // Ако го НЯМА в ключа този подстринг
                console.log("Substring not found!");        // печатаме, че не го съдържа 
            }

        } else if (command === "Flip") {                        // Ако командата е Flip
            let upperOrLower = line[1];                         // Вадим си дали към малки или големи ще променяме буквите 
            let startIndex = Number(line[2]);                   // Стартовия индекс ни е на втори индекс 
            let endIndex = Number(line[3]);                     // Крайният индекс е на трети индекс 
            let start = activationKey.substring(0, startIndex); // началото е от 0 до стартовия индекс 
            let end = activationKey.substring(endIndex);        // края е от крайния индекс до края 
            let middle = activationKey.substring(startIndex, endIndex); // средата е между двата индекса 
            if (upperOrLower === "Upper") {                     // Проверяваме дали трябва към големи букви да променяме 
                middle = middle.toLocaleUpperCase();            // средата(изрязаната част) я превръщаме в големи букви 
            } else {                                            // Проверяваме дали трябва към малки букви да променяме
                middle = middle.toLocaleLowerCase();            // средата(изрязаната част) я превръщаме в малки букви
            }
            activationKey = start + middle + end;               // ключа ни е начало + среда + край 
            console.log(activationKey);                         // печатаме ключа към момента 

        } else if (command === "Slice") {                       // Ако командата е Slice
            let startIndex = Number(line[1]);                   // Стартовия индекс ни е на първи индекс
            let endIndex = Number(line[2]);                     // Крайният индекс е на втори индекс
            let start = activationKey.substring(0, startIndex); // началото е от 0 до стартовия индекс    
            let end = activationKey.substring(endIndex);        // края е от крайния индекс до края    
            activationKey = start + end;                        // ключа ни е начало + край
            console.log(activationKey);                         // печатаме ключа към момента
        }

    }

    console.log(`Your activation key is: ${activationKey}`);    // Печатаме финалното съобщение 
}
activationKeys([
"abcdefghijklmnopqrstuvwxyz",
"Slice>>>2>>>6",
"Flip>>>Upper>>>3>>>14",
"Flip>>>Lower>>>5>>>7",
"Contains>>>def",
"Contains>>>deF",
"Generate",]);