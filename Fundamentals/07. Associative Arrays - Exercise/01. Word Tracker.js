function wordTracker(input){

    let words = {}              // Създаваме обект, в който да пазим думите и техните срещания 

    let searchedWords = input.shift().split(" ")
    // Взимаме първия ел от инпута, сплитваме го по разстояние и става масив

    searchedWords.map(word => words[word] = 0)    // всяка дума от търсените думи, я добавяме като пропърти в обекта със стойност 0

    for (let word of input){                // Минаваме и взимаме всяка дума от останалия масив 
        if (words.hasOwnProperty(word)){    // ако думата я има като пропърти в обекта 
            words[word]++                   // увеличаваме нейния брой срещания 
        }
    }

    let sorted = Object.entries(words).sort((a, b) => b[1] - a[1])  // обекта го правим на масив и го сортираме по срещанията
        for (let [word, occurrences] of sorted)     // Минаваме и създаваме дума и срещане от масива 
        console.log(`${word} - ${occurrences}`)     // печатаме думата и срещанията и 

}
wordTracker([
'this sentence',
'In', 'this', 'sentence', 'you', 'have',
'to', 'count', 'the', 'occurrences', 'of',
'the', 'words', 'this', 'and', 'sentence',
'because', 'this', 'is', 'your', 'task'
    ])