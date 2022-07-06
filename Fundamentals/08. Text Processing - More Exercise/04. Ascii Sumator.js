function asciiSumator(input){

    let [firstSymbol, secondSymbol, string] = input     // Взимаме инпута 
    firstSymbol = firstSymbol.charCodeAt()              // Взимаме техните ASCII стойности 
    secondSymbol = secondSymbol.charCodeAt()            // Взимаме техните ASCII стойности 
    let result = 0                                      // Правим брояч за крайния резултат 

    for (let i = 0; i < string.length; i++){            // Минаваме по всяка буква от стринга 
        let currentLetter = string[i].charCodeAt()      // Взимаме неговата ASCII стойност 
        if (currentLetter > firstSymbol && currentLetter < secondSymbol && firstSymbol < secondSymbol){
            // Ако първия символ е по-малък, проверяваме дали буквата е по-голяма от първия символ и по-малка от втория символ 
            result += currentLetter     // Добавяме стойността на буквата към резултатат
        } else if (currentLetter < firstSymbol && currentLetter > secondSymbol && firstSymbol > secondSymbol){
            // Ако първия символ е по-голям, проверяваме дали буквата е по-малка от първия символ и по-голяма от втория символ
            result += currentLetter     // Добавяме стойността на буквата към резултатат
        }
    }
    console.log(result)
}
asciiSumator(['.',
'@',
'dsg12gr5653feee5'])

asciiSumator(['?',

'E',

'@ABCEF'])

asciiSumator(['a',

'1',

'jfe392$#@j24ui9ne#@$'])