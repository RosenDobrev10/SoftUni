function theImitationGame(input) {

    let message = input.shift();                        // Изваждаме криптираното съобщение от нулевия индекс на масива 

    while (input[0] !== "Decode") {                     // Докато получим на нулев индекс Decode, въртим цикъла 
        let line = input.shift().split("|");            // Изваждаме линията на нулев индекс и я сплитваме по пайп 
        let command = line[0];                          // Командата се намира на нулев индекс от линията 

        if (command === "Move") {                       // Ако командата е Move
            let n = Number(line[1]);                    // Взимаме броя числа от първия индекс на линията и го превръщаме в число 
            let start = message.substring(0, n);        // Взимаме подстринг от началото до индекса 
            let end = message.substring(n);             // Взимаме подстринг от индекса до края 
            message = end + start;                      // Променяме съобщението да е края + началото 
        } else if (command === "Insert") {              // Ако командата е Insert
            let index = Number(line[1]);                // Взимаме индекса от първия индекс на линията и го превръщаме в число
            let value = line[2];                        // Стойността, която трябва да добавим е на втори индекс от линията 
            let leftHalf = message.substring(0, index); // Лявата половина е подстринг от 0 до индекса
            let rightHalf = message.substring(index);   // Дясната половина е подстринг от индекса до края 
            message = leftHalf + value + rightHalf;     // Променяме съобщението да е лявата част + стойността + дясната част
        } else if (command === "ChangeAll") {           // Ако командата е ChangeAll   
            let substring = line[1];                    // Взимаме, това което трябва да сменим от първи индекс на линията 
            let replacement = line[2];                  // Взимаме, това С което трябва да сменим от втори индекс на линията 
            message = message.split(substring).join(replacement);   // Разделяме по смененото и съединяваме по заменката 
        }
    }

    console.log(`The decrypted message is: ${message}`);    // Печатаме съобщението накрая 
}
theImitationGame(["zzHe", "ChangeAll|z|l", "Insert|2|o", "Move|3", "Decode"]);
theImitationGame(['owyouh', 'Move|2', 'Move|3', 'Insert|3|are', 'Insert|9|?', 'Decode' ])
