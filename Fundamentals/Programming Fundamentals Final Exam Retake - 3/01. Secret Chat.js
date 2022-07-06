function secretChat(input){
    
    let message = input.shift();                             // Изваждаме съобщението от инпута 

    while (input[0] !== 'Reveal'){                           // Ако елемента на нулев индекс, не ни е Reveal въртим цикъла
        let line = input.shift().split(":|:");               // Взимаме линията от масива, разделена по :|:
        let command = line[0]         ;                      // Самата команда е на нулев индекс 

        if (command === 'InsertSpace'){                      // Ако командата е InsertSpace 
            let index = line[1];                             // Намираме индекса на първи индекс от линията 
            let firstHalf = message.substring(0, index);     // Първата половина е от 0 до индекса 
            let secondHalf = message.substring(index);       // Втората половина е от индекса до края на съобщението
            message = firstHalf + ' ' + secondHalf;          // Променяме съобщението, като събираме първата половина + интервал + втората половина 
            console.log(message);                            // Печатаме съобщението 

        } else if (command === 'Reverse'){                   // Ако командата е InsertSpace
            let substring = line[1];                         // Намираме подстринга на първи индекс от линията 
            if (!message.includes(substring)){               // Ако в съобщението НЯМА подстринга
                console.log("error");                        // Печатаме грешка 
            } else {
                let index = message.indexOf(substring);      // Намираме индекса, на който започва подстринга 
                let firstHalf = message.substring(0, index); // Първата половина е от 0 до индекса 
                let secondHalf = message.substring(index + substring.length);    // Втората половина започва от индекса + дължината на подстринга до края на съобщението
                message = firstHalf + secondHalf + substring.split("").reverse().join("");
                // Променяме съобщението, като събираме първата и втората половина и към тям добавяме обърнатия подстринг   
                console.log(message);                        // Печатаме съобщението
            }

        } else if (command === 'ChangeAll'){                 // Ако командата е InsertSpace
            let occurences = line[1];                        // Буквите, които трябва да променим
            let replacement = line[2];                       // Буквите, с които трябва да заменим 
            message = message.split(occurences).join(replacement);   // Променяме съобщението, като сплитваме по срещанията и джоинваме по заменката 
            console.log(message);                            // Печатаме съобщението
        }

    }
    console.log(`You have a new text message: ${message}`);  // Печатаме съобщението накрая 

}
secretChat([
'heVVodar!gniV',
'ChangeAll:|:V:|:l',
'Reverse:|:!gnil',
'InsertSpace:|:5',
'Reveal'])