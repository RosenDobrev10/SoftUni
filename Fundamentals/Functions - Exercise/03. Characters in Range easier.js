function charactersInRange(charOne, charTwo){

    let startChar = Math.min(charOne.charCodeAt(0),charTwo.charCodeAt(0))  // Намираме началото на символите с мin 
    let endChar = Math.max(charOne.charCodeAt(0),charTwo.charCodeAt(0))    // Намираме краят на символите с мax
    let printline = []                                          // Правим празен масив, в който да трупаме стойностите

    for (let i = startChar + 1; i <= endChar - 1; i++){  // Правим цикъл от следващият елемент на началото до предишния елемент от края 
        printline.push(String.fromCodePoint(i))     // Слагаме елемента в празния масив като го връщаме към символ
    }
    console.log(printline.join(" "))    // печатаме масива като го разделим по разстояние 
}
charactersInRange('a','d')
charactersInRange('#',':')
charactersInRange('C','#')