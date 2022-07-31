function sortArray(arr, type) {

    if (type === "asc") {               // Ако типа е ascending
        arr.sort((a, b) => a - b);      // Сортираме по нарастващ ред 
    } else {                            // Ако типа е descending
        arr.sort((a, b) => b - a);      // Сортираме по намалящ ред
    }

    return arr;                         // Накрая функцията връща сортирания масив 
}
sortArray([14, 7, 17, 6, 8], "asc");
sortArray([14, 7, 17, 6, 8], "desc");
