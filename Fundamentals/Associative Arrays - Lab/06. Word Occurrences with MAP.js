function wordOccurrences(input){

    let words = new Map()                   // Правим обект от тип МАП 
    
    for (let word of input){                // минаваме по масива с думи 
        let occurrences = 1                 // Всяка дума се среща поне веднъж 
        if (words.has(word)){               // Ако думата я има вече за втори път 
            occurrences += words.get(word)    // Към сегашния брой срещания добавяме срещанията отпреди това 
        }
        words.set(word, occurrences)          // Добавяме думата и броя срещания, ако думата я има сменя срещанията
    }

    let sorted = Array.from(words).sort((a, b) => b[1] - a[1])
    // Променяме обекта на масив и след това го сортираме по броя на срещанията на думата 

    for (let [word, occurrences] of sorted){                // правим променливи от масива 
        console.log(`${word} -> ${occurrences} times`)      // печатаме ги 
    }

}
wordOccurrences(["Here", "is", "the", "first", "sentence",
"Here", "is", "another", "sentence", "And",
"finally", "the", "third", "sentence"])