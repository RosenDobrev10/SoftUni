function addAndSubstract(array) {
    let sumOriginalArray = 0                // създаваме променлива за изчисляване на оригиналния масив 
    let sumNewArray = 0;                    // създаваме променлива за изчисляване на модифицирания масив
                        
    for (let i = 0; i < array.length; i++) {
        sumOriginalArray += array[i]        // Събираме стойностите преди да сме ги модифицирали в if-else конструкцията
        if (array[i] % 2 === 0) {
            array[i] += i;
        } else {
            array[i] -= i;
        }
        sumNewArray += array[i]             // Събираме стойностите след като сме ги модифицирали в if-else конструкцията
    }

    console.log(array);
    console.log(sumOriginalArray);
    console.log(sumNewArray);
}
addAndSubstract([5, 15, 23, 56, 35]);
addAndSubstract([-5, 11, 3, 0, 2]);
