function melrahShake(input) {
 
    let [text, pattern] = input                     // Взимаме си текста и патърна 
 
    while (pattern.length > 0) {                    // Докато патърна не стане 0 въртим 
 
        let firstMatch = text.indexOf(pattern);     // Взимаме индекса за начало на първото срещане на патърна 
        let lastMatch = text.lastIndexOf(pattern);  // Взимаме индекса за начало на последното срещане на патърна 
 
        if (firstMatch !== lastMatch && (firstMatch > -1 && lastMatch > -1)) {
            // Ако има поне две срещания различни едно на друго и има поне 2 такива 
 
            text = text.split('');                          // Правим масив 
            text.splice(firstMatch, pattern.length);        // Изтриваме, толкова елементи, колкото е дължината на патърна от началото на първото срещане 
            text = text.join('');                           // Правим пак стринг 
            lastMatch = text.lastIndexOf(pattern);          // индекса на последното срещане се е променил, намираме го пак 
            text = text.split('')                           // Правим масив 
            text.splice(lastMatch, pattern.length)          // Изтриваме, толкова елементи, колкото е дължината на патърна от началото на последното срещане
            text = text.join('')                            // правим пак стринг
            let letterToDelete = pattern[Math.floor(pattern.length / 2)] // Взимаме от патърна, буквата, която се намира на индекс равен на дължината на патърна делено на 2
            pattern = pattern.replace(letterToDelete, '');  // Променяме буквата с празно пространство
            console.log('Shaked it.');                      // Щом сме намерили 2 пъти съвпадение на патърна, печатаме съобщение
        } else {                                            // Ако не намерим поне 2 съвпадения
            break;                                          // Прекъсваме търсенето на шаблона 
        }
    }

    console.log('No shake.');                       // Печатаме съобщение 
    console.log(text);                              // Печатаме останалото от текста 
}
melrahShake(['astalavista baby', 'sta'])