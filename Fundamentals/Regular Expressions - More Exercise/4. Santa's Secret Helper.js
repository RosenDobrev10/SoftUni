function santasSecretHelper(input) {

    let key = Number(input.shift());    // Взимаме ключа от първия елемент от масива

    for (let line of input) {           // Минаваме по всяка линия от масива 
        if (line === "end") {           // Ако линията е end 
            break;                      // Приключваме цикъла 
        }
        let decryptedMessage = "";             // Правим празно съобщение

        for (let letter of line) {              // Минаваме по всяка буква от линията 
            let decryptedLetter = String.fromCharCode(letter.charCodeAt() - key);   // Взимаме числото вадим ключа и връщаме към буква 
            decryptedMessage += decryptedLetter;            // Добавяме към декриптираното съобщение, декриптираната буква 
        }

        let pattern = /@(?<childName>[A-Za-z]+)[^@\-!:>]*!(?<type>[G|N])!/g;     
        let match = pattern.exec(decryptedMessage);                 // Взимаме съвпадението
        if (match !== null) {                                       // Ако има такова 
            let childName = match.groups.childName;                 // Взимаме името на детето 
            let type = match.groups.type;                           // Взимаме типа поведение 
            if (type === "G") {                                     // Ако типа на поведение е G
                console.log(childName);                             // го отпечатваме 
            }
        }
    }
}
santasSecretHelper([
"3",
"CNdwhamigyenumje$J$",
"CEreelh-nmguuejnW$J$",
"CVwdq&gnmjkvng$Q$",
"end",]);