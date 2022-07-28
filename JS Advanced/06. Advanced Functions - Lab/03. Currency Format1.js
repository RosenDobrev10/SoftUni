function createFormatter(separator, symbol, symbolFirst, formatter) {
    // Създаваме ф-я с 4 параметъра, като последния е друга ф-я

    return formatter.bind(null, separator, symbol, symbolFirst);
    // Връщаме функцията байндната с null и останалите три параметъра 
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
