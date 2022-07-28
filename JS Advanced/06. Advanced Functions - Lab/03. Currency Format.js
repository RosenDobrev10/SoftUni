function createFormatter(separator, symbol, symbolFirst, currencyFormatter) {
    // Създаваме ф-ция с 3 параметъра и функция currencyFormatter

    let formatter = function (value) {  // Създаваме променлива formatter, 
        return currencyFormatter(separator, symbol, symbolFirst, value);    // която ще е резултата от изпълнението на функцията currencyFormatter
    };
    return formatter;                   // Накрая връщаме formatter 
}
let dollarFormatter = createFormatter(",", "$", true, currencyFormatter);
console.log(dollarFormatter(5345)); // $ 5345,00
console.log(dollarFormatter(3.1429)); // $ 3,14
console.log(dollarFormatter(2.709)); // $ 2,71

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);

    if (symbolFirst) return symbol + " " + result;
    else return result + " " + symbol;
}
