function greatestCommonDivisor(a, b) {

    if (b !== 0) {
        return greatestCommonDivisor(b, a % b);
    } else {
        console.log(a);
    }
}
greatestCommonDivisor(15, 5);
greatestCommonDivisor(2154, 458);
