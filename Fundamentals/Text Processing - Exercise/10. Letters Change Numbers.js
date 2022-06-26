function lettersChangeNumbers(string) {
    let alphabet = { 'A': 1,'B': 2,'C': 3,'D': 4,'E': 5,'F': 6,'G': 7,'H': 8,'I': 9,'J': 10,'K': 11,'L': 12,'M': 13,
                     'N': 14,'O': 15,'P': 16,'Q': 17,'R': 18,'S': 19,'T': 20,'U': 21,'V': 22,'W': 23,'X': 24,'Y': 25,'Z': 26,};
    // Създаваме обект, в който ще стоят позициите на буквите в азбуката, по които ще изчисляваме 

    let words = string.split(" ");  // разделяме стринга на отделни думи 
    let sumAllWords = 0;             // Правим брояч на цялата сума от думите 

    for (let word of words) {       // Минаваме по всяка дума от масива 
        let sum = 0;                // Правим брояч за сумата на конкретната дума 

        if (word.length === 0) {        // Ако думата е празна 
            sumAllWords += sum;          // Добавяме 0 към цялата сума 
        } else {                        // Ако думата е празна 
            let firstLetter = word[0];                  // Взимаме първата буква от думата 
            let number = Number(word.substring(1, word.length - 1));    // Между тях се намира нашето число 
            let lastLetter = word[word.length - 1];     // Взимаме последната буква от думата 

            if (firstLetter.toLocaleUpperCase() === firstLetter) {  // Ако превърнем буквата в главна и е равна на себе си, значи е била главна 
                sum += number / alphabet[firstLetter.toLocaleUpperCase()];  // Към сумата добавяме, числото делено на позицията му 
            } else {                                    // Ако превърнем буквата в главна и е равна на себе си, значи е била малка
                sum += number * alphabet[firstLetter.toLocaleUpperCase()];  // Към сумата добавяме, числото умножено по позицията му
            }

            if (lastLetter.toLocaleUpperCase() === lastLetter) {    // Ако превърнем буквата в главна и е равна на себе си, значи е била главна
                sum -= alphabet[lastLetter.toLocaleUpperCase()];    // От сумата изваждаме, позицията му
            } else {                            // Ако превърнем буквата в главна и е равна на себе си, значи е била малка
                sum += alphabet[lastLetter.toLocaleUpperCase()];    // Към сумата добавяме, позицията му
            }
            sumAllWords += sum;                  // Изчислената сума я добавяме към общата 
        }
    }
    console.log(sumAllWords.toFixed(2));         // Печатаме към втората цифра след дес. запетая 
}
//lettersChangeNumbers('A12b s17G')
lettersChangeNumbers("P34562Z q2576f   H456z");
//lettersChangeNumbers('a1A')
