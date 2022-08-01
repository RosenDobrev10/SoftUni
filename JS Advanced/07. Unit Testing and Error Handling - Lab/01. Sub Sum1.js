function subSum(arr, startIndex, endIndex) {

    if (Array.isArray(arr) === false) return NaN;       // Array.isArray проверява дали подаденото в скобите е масив, ако не е връщаме NaN
    if (startIndex < 0) startIndex = 0;                 // Ако стартовия индекс е по-малък от 0, го правим да е 0 
    if (endIndex > arr.length - 1) endIndex = arr.length - 1;   // Ако крайния индекс е по-голям от последния елемент на масива, го правим да е крайния индекс на масива 

    return arr.slice(startIndex, endIndex + 1).map(Number).reduce((acc, x) => acc + x, 0)
}
console.log(subSum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(subSum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(subSum([10, "twenty", 30, 40], 0, 2));
console.log(subSum([], 1, 2));
console.log(subSum("text", 0, 2));