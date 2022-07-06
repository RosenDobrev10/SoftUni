function pascalCaseSplitter(string) {

    let sentence = [];                  // Правим масив, в който ще слагаме думите ни
    let currentWord = string[0];        // Текущата дума започва с първата ГЛАВНА БУКВА(S)

    for (let i = 1; i < string.length; i++) {   // Започваме да въртим масива от следващата буква 
        let currentChar = string[i];            // взимаме текущата буква 

        if (currentChar.toLocaleLowerCase() === currentChar) {  // Ако тя съвпада със смалената си версия, значи е малка  
            currentWord += currentChar;                         //  Към текущата дума, добавяме текущата буква 
        } else {                                                // Ако не съвпадат, значи буквата е голяма        
            sentence.push(currentWord);                         // Добавяме получената дума до момента, към масива 
            currentWord = currentChar;                          // Думата става равна на главната буква за начало на следващата 
        }
    }

    sentence.push(currentWord);                              // Накрая добавяме последната дума, тъй като не сме влезли в цикъла 
    console.log(sentence.join(", "));                       // Съединяваме масива със запетая и интервал 
}
pascalCaseSplitter("SplitMeIfYouCanHaHaYouCantOrYouCan");
pascalCaseSplitter("HoldTheDoor");
pascalCaseSplitter("ThisIsSoAnnoyingToDo");
