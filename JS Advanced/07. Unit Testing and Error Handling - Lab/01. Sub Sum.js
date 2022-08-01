function subSum(arr, startIndex, endIndex) {

    let sum = 0;                                        // Правим брояч за крайната сума 

    if (Array.isArray(arr) === false) return NaN;       // Array.isArray проверява дали подаденото в скобите е масив, ако не е връщаме NaN
    if (startIndex < 0) startIndex = 0;                 // Ако стартовия индекс е по-малък от 0, го правим да е 0 
    if (endIndex > arr.length - 1) endIndex = arr.length - 1;   // Ако крайния индекс е по-голям от последния елемент на масива, го правим да е крайния индекс на масива 

    for (let i = startIndex; i <= endIndex; i++) {          // Минаваме по елементите от масива 
        sum += Number(arr[i]);                              // И ги сумираме като кастваме към Number всеки елемент 
    }
    return sum;                                             // Накрая функцията връща сумата 
}
console.log(subSum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(subSum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(subSum([10, "twenty", 30, 40], 0, 2));
console.log(subSum([], 1, 2));
console.log(subSum("text", 0, 2));