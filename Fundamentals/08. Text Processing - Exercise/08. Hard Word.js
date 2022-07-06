function hardWord(array){
 
    let words = array[1];                                   // Взимаме думите от първи индекс на масива
    let text = array[0];                                    // Взимаме текса от нулев индекс на масива 
    words.sort((a, b) => b.length - a.length);              // Сортираме думите по намаляща големина 
     
    for (let word of words){                                // Минаваме по всяка дума от думите 
        text = text.replace("_".repeat(word.length), word)  // Когато намери, толкова дълга дума я заменя 
    }

    console.log(text);                                      // Отпечатваме текста 
}
hardWord(['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.',
['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained']])