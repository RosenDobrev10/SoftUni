function emojiDetector(input) {

    input = input.shift();                          // Превръщаме инпута в стринг

    let emojiPattern = /(:{2}|\*{2})(?<word>[A-Z][a-z]{2,})\1/g;
    // Започваме с 2 :: или 2 ** => после имаме група дума, почва с главна и после поне 2 малки => завършваме с каквото сме почнали 
    let digitsPattern = /\d/g;                      // Патърна за цифри е всяка една поотделна да се намира 
    let coolTreshold = 1;                           // Започваме от 1, а не от 0, защото ще ги умножаваме!!!
    let matchNumber = digitsPattern.exec(input);    // Намираме съвпаденията за числа 
    let emojis = [];                                // Правим празен масив, в който ще пазим емоджитата
    let emojiMatch = emojiPattern.exec(input);      // Намираме съвпаденията за емоджитата
    let countOfEmojis = 0;                          // Правим брояч за намерените емоджита 

    while (matchNumber !== null) {                  // Докато имаме съвпадение за число 
        coolTreshold *= Number(matchNumber[0]);     // Взимаме числото от нулев индекс и го умножаваме по досегашното 
        matchNumber = digitsPattern.exec(input);    // Подменяме съвпадението
    }

    while (emojiMatch !== null) {                   // Докато имаме съвпадение за емоджи 
        countOfEmojis++;                            // Увеличаваме с едно брояча за намерени емоджита 
        let word = emojiMatch.groups.word;          // Изваждаме само думата без символите пред и зад нея 
        let sumLetters = 0;                         // Правим брояч за стойността от ASCII стойностите на буквите и 

        for (let letter of word) {                  // Минаваме по всяка буква от думата 
            sumLetters += letter.charCodeAt();      // Добавяме стойността на всяка буква към сумата 
        }

        if (sumLetters > coolTreshold) {            // Ако получената стойност е по-голяма от границата за готини емоджита 
            emojis.push(emojiMatch[0]);             // към масива с емоджита добавяме емоджито с неговите символи отпред и отзад 
        }
        emojiMatch = emojiPattern.exec(input);      // Подменяме емоджито с ново 
    }

    console.log(`Cool threshold: ${coolTreshold}`); // Печатаме намерената граница 
    console.log(`${countOfEmojis} emojis found in the text. The cool ones are:`);   // Печатаме общия брой намерени емоджита 
    console.log(emojis.join("\n"));                 // Печатами готините емоджита всяко на нов ред 
}
emojiDetector(["In the Sofia Zoo there are 311 animals in total! ::Smiley:: This includes 3 **Tigers**, 1 ::Elephant:, 12 **Monk3ys**, a **Gorilla::, 5 ::fox:es: and 21 different types of :Snak::Es::. ::Mooning:: **Shy**",]);
emojiDetector(["5, 4, 3, 2, 1, go! The 1-th consecutive banana-eating contest has begun! ::Joy:: **Banana** ::Wink:: **Vali** ::valid_emoji::",]);
emojiDetector(["It is a long established fact that 1 a reader will be distracted by 9 the readable content of a page when looking at its layout. The point of using ::LoremIpsum:: is that it has a more-or-less normal 3 distribution of 8 letters, as opposed to using 'Content here, content 99 here', making it look like readable **English**.",]);
