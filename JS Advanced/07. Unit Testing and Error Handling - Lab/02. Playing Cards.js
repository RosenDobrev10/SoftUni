function createCard(face, suit) {

    const faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",];   // Правим масив с картите 

    const suits = {                     // Правим обект с боите
        S: "\u2660",                    // На ключа S отговаря UTF-2660, което е знака за пика
        H: "\u2665",                    // На ключа H отговаря UTF-2665, което е знака за купа    
        D: "\u2666",                    // На ключа D отговаря UTF-2666, което е знака за каро
        C: "\u2663",                    // На ключа C отговаря UTF-2663, което е знака за спатия
    };

    if (faces.includes(face) === false) {   // Ако проверим в масива и потърсим за подадената ни карта и я ще е false 
        throw new Error("Invalid face: " + face);       // Хвърляме нова грешка със съобщение за невалидна карта  
    }

    if (suits[suit] === undefined ){        // Ако проверим в обекта с боите, подадената боя, ако я няма ще е undefined
        throw new Error("Invalid suit: " + suit);       // Хвърляме нова грешка със съобщение за невалидна боя 
    }

    const result = {                    // Правим обект с резултата 
        face,                           // Картата си е самата подадена от параметрите 
        suit: suits[suit],              // Боята е бъркаме в обекта с боите и изваждаме подадената ни от параметрите 
        toString() {                    // Override-ваме метода toString, като му казваме да е равен на картата + боята 
            return this.face + this.suit;
        },
    };

    return result;                      // Накрая функцията ни връща резултата 
}
console.log(createCard("A", "S").toString());
console.log(createCard("10", "H").toString());
console.log(createCard("1", "C").toString());
