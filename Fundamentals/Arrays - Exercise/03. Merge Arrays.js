function mergeArrays(array1, array2) {
    let newArray = [];                                  // Създаваме трети масив, в който да запазваме новите стойности
    for (let i = 0; i < array1.length; i++) {
        if (i % 2 === 0) {
            newArray.push(Number(array1[i]) + Number(array2[i]));   // Към новия масив добавяме сумата на двете числа от четните индекси
        } else {
            newArray.push(array1[i] + array2[i]);       // към новия масив добавяме конкатенираните стрингове от нечетните индекси 
        }
        
    }
    console.log(newArray.join(" - "));
}
mergeArrays(["5", "15", "23", "56", "35"], ["17", "22", "87", "36", "11"]);

mergeArrays(["13", "12312", "5", "77", "4"], ["22", "333", "5", "122", "44"]);
