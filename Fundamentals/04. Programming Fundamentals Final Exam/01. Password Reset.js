function passwordReset(input) {

    let password = input.shift();                           // Взимаме паролата от нулев индекс на инпута 

    while (input[0] !== "Done") {                           // Докато не дойде Done, въртим цикъла 
        let line = input.shift().split(" ");                // Взимаме линията от инпута и я делим по интервал 
        let command = line[0];                              // Командата е на нулев индекс 

        if (command === "TakeOdd") {                        // Ако командата е TakeOdd
            let newPassword = "";                           // Правим празен стринг, в който ще създадем нова парола 
            for (let i = 1; i < password.length; i += 2) {  // Минаваме по всички НЕЧЕТНИ индекси от старата парола 
                newPassword += password[i];                 // Запазваме всяка нечетна буква от старата парола, в новата 
            }
            password = newPassword;                         // Заменяме старата парола с новата 
            console.log(password);                          // Печатаме паролата до момента 

        } else if (command === "Cut") {                     // Ако командата е Cut
            let index = Number(line[1]);                    // на първи индекс е индекса, от който да почнем 
            let length = Number(line[2]);                   // на втори индекс е дължината, която трябва да премахнем 
            let start = password.substring(0, index);       // Началото е от 0 до индекса 
            let end = password.substring(index + length);   // края е от индекса + броя букви за махане до края 
            password = start + end;                         // паролата вече е началото + края 
            console.log(password);                          // Печатаме паролата до момента

        } else if (command === "Substitute") {              // Ако командата е Substitute
            let substring = line[1];                        // на първи индекс е подстринга за премахване 
            let substitute = line[2];                       // на втори индекс е подстринга за добавяне на мястото на премахнатия 
            if (password.includes(substring)) {             // Ако в паролата ГО ИМА подстринга за премахване 
                password = password.split(substring).join(substitute);  // Премахваме подстринга и слагаме новия 
                console.log(password);                      // Печатаме паролата до момента
            } else {                                        // Ако го няма в паролата 
                console.log("Nothing to replace!");         // Печатаме, че го няма 
            }
        }

    }

    console.log(`Your password is: ${password}`);           // Печатаме накрая получената парола 
}
passwordReset([
"Siiceercaroetavm!:?:ahsott.:i:nstupmomceqr",
"TakeOdd",
"Cut 15 3",
"Substitute :: -",
"Substitute | ^",
"Done",]);