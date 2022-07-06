function oddOccurrences(input){

    input = input.toLowerCase().split(" ")  // Правим всички думи в инпута да са с малки букви и ги делим по разстояние 
    let words = {}                          // Създаваме празен обект 

    for (let word of input){                // Минаваме по думите от масива      
        words.hasOwnProperty(word) ? words[word]++ : words[word] = 1
        // Ако думата се среща в обекта, увеличаваме бройката с 1, ако не се среща, създаваме пропърти и слагаме стойност 1
    }

    let sorted = Object.entries(words)  // Обекта го превръщаме в масив от 2 променливи
    let result = []                     // Правим празен масив, в който ще добавяме филтрираните думи 

    for (let [word, occurrences] of sorted){    // Минаваме по думите и нейните срещания 
        if (occurrences % 2 === 1){             // Ако срещанията са НЕЧЕТНИ 
            result.push(word)                   // добавяме думата към масива
        }
    }

    console.log(result.join(" "))               // печатаме с разстояние между тях думите от масива 
    
}
oddOccurrences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#')
//oddOccurrences('Cake IS SWEET is Soft CAKE sweet Food')