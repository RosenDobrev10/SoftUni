function wordOccurrences(input){

    let words = {}                   // Правим обект
    
    for (let word of input){                 // минаваме по масива с думи                 
        if (words.hasOwnProperty(word)){    // Ако думата сме я срещали вече 
            words[word]++                   // добавяме още веднъж 
        } else {                            // Ако думата я срещани за първи път 
            words[word] = 1                 // Добавяме думата към обекта и че сме я срещанали за първи път 
        }
    }

    let sorted = Object.entries(words).sort((a, b) => b[1] - a[1])
    // Променяме обекта на масив и след това го сортираме по броя на срещанията на думата 

    for (let [word, occurrences] of sorted){                // правим променливи от масива 
        console.log(`${word} -> ${occurrences} times`)      // печатаме ги 
    }

}
wordOccurrences(["Here", "is", "the", "first", "sentence",
"Here", "is", "another", "sentence", "And",
"finally", "the", "third", "sentence"])