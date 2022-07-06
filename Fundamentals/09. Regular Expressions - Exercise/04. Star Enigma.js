function starEnigma(input) {

    let lines = input.shift();                  // Изваждаме броя на линиите от инпута 
    let attackedPlanets = [];                   // Правим празен масив за атакуваните планети 
    let destroyedPlanets = [];                  // Правим празен масив за унищожените планети 

    for (let line of input) {                   // Минаваме по всяка линия от останалия инпут
        let key = 0;                            // Правим брояч за ключа

        for (let letter of line) {              // Минавама по всяка буква от линията 
            if (letter === "S" || letter === "s" || letter === "T" || letter === "t" || letter === "A" || letter === "a" || letter === "R" || letter === "r") {
                // ако е [S,T,A,R] или [s,t,a,r]
                key++;                          // Увеличаваме стойността на ключа
            }
        }

        let decryptedMessage = "";              // Правим празно декриптирано съобщение 

        for (let letter of line) {              // Минаваме отново по всяка буква от линията 
            let decryptedLetter = String.fromCharCode(letter.charCodeAt() - key);
            // превръщаме буквата в число от нея вадим ключа и я връщаме отново в буква 
            decryptedMessage += decryptedLetter;    // декриптирана буква я прибавяме към декриптираното съобщение
        }

        let pattern =/[^@\-!:>]*?\@(?<planet>[A-Za-z]+)[^@\-!:>]*?\:(?<population>\d+)[^@\-!:>]*?\!(?<type>[A|D])\![^@\-!:>]*?\-\>(?<soldiers>\d+)[^@\-!:>]*?/g;
        let match = pattern.exec(decryptedMessage);     // Взимаме съвпадението от декриптираното съобщение 
        if (match !== null) {                           // Ако има такова 
            let planet = match.groups.planet;           // Взимаме планетата
            let attackType = match.groups.type;         // Взимаме типа на атаката
            if (attackType === "A") {                   // Ако е атакувана 
                attackedPlanets.push(planet);           // Добавяме към масива с атакуваните планети
            } else if (attackType === "D") {            // Ако е унищожена 
                destroyedPlanets.push(planet);          // Добавяме към масива с унищожените планети
            }
        }
    }

    let sortedAttackedPlanets = attackedPlanets.sort((a, b) => a.localeCompare(b));     // Сортираме атакуваните планети
    let sortedDestroyedPlanets = destroyedPlanets.sort((a, b) => a.localeCompare(b));   // Сортираме унищожените планети 

    console.log(`Attacked planets: ${sortedAttackedPlanets.length}`);               // Печатаме колко планети има атакувани
    for (let planet of sortedAttackedPlanets) {                                     // Минаваме по всяка планета от атакуваните
        console.log(`-> ${planet}`);                                                // Печатаме всяка атакувана планета
    }

    console.log(`Destroyed planets: ${sortedDestroyedPlanets.length}`);             // Печатаме колко планети има унищожени
    for (let planet of sortedDestroyedPlanets) {                                    // Минаваме по всяка планета от унищожените           
        console.log(`-> ${planet}`);                                                // Печатаме всяка унищожена планета
    }
    
}
starEnigma(["3",
"tt(''DGsvywgerx>6444444444%H%1B9444",
"GQhrr|A977777(H(TTTT",
"EHfsytsnhf?8555&I&2C9555SR",]);