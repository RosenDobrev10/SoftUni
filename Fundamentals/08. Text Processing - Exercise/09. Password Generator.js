function passwordGenerator(input){

    let [firstWord, secondWord, word] = input       // Взимаме си трите променливи от инпута 
    word = word.toLocaleUpperCase()                 // Правим думата да е с главни букви 
    let concatenated = firstWord + secondWord       // Конкатенираме първата и втората дума 
    let password = ''                               // Създаваме празна парола, в която ще слагаме генерираните символи 
    let usedLetters = 0                             // Правим брояч, коя буква взимаме от думата 
    
    for (let i = 0; i < concatenated.length; i++){  // Минаваме по всяка буква от конкатенираното
        let currentChar = concatenated[i]           // Взимаме текущата буква 

        if ((currentChar === 'a') || (currentChar === 'e') || (currentChar === 'i') || (currentChar === 'o') || (currentChar === 'u')) {
                                                    // Проверяваме дали текущата буква е гласна 
                currentChar = word[usedLetters]     // Подменяме буквата с поредната от думата 
                usedLetters++                       // Минаваме на следващата буква от думата 
                if (usedLetters === word.length){   // Ако стигнем края на думата
                    usedLetters = 0                 // се връщаме отначало 
                }
            }

        password += currentChar                     // Добавяме всяка буква към паролата 
    }

    console.log(`Your generated password is ${password.split("").reverse().join("")}`)
    // Отпечатваме получената парола, разделена, обърната и събрана отново 
}
passwordGenerator(['ilovepizza', 'ihatevegetables', 'orange'])
// passwordGenerator(['easymoneyeazylife', 'atleasttencharacters', 'absolute'])
// passwordGenerator(['areyousureaboutthisone', 'notquitebutitrustyou', 'disturbed'])