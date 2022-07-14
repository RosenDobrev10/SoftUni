function charactersInRange(charOne, charTwo){
    let charOneNumber = charOne.charCodeAt(0)    // Превръщаме първия символ в число 
    let charTwoNumber = charTwo.charCodeAt(0)    // Превръщаме втория символ в число 
    let printline = ''                          // Създаваме си празен стринг, в който да трупаме символите 
    if ( charOneNumber < charTwoNumber){        // Ако първото число е по-малко от второто, то първото ще ни е начало
        for (let i = charOneNumber + 1; i <= charTwoNumber - 1; i++){   // Правим цикъл от първото + 1, до второто - 1
            printline += String.fromCodePoint(i) + " "   // Връщаме ги пак в символ и слагаме разстояние 
        }
    } else {                                    // Ако второто число е по-малко от първото, то второто ще ни е начало
        for (let i = charTwoNumber + 1; i <= charOneNumber - 1; i++){   // Правим цикъл от второто + 1, до първото - 1
            printline += String.fromCodePoint(i) + " "   // Връщаме ги пак в символ и слагаме разстояние
        }
    }
    console.log(printline)
}
charactersInRange('a','d')
charactersInRange('#',':')
charactersInRange('C','#')