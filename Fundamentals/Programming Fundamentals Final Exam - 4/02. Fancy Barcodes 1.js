function fancyBarcodes(input) {
    for (let i = 1; i < input.length; i++) {
        const validPattern = /@#+[A-Z][A-Za-z\d]{4,}[A-Z]@#+/g;
        const digitPattern = /\d/g;
        const currentLine = input[i];
        if (validPattern.test(currentLine)) {
            const matches = currentLine.match(digitPattern);
            matches ? console.log(`Product group: ${matches.reduce((a, b) => a + b)}`) : console.log('Product group: 00');
        } else {
            console.log('Invalid barcode');
        }
    }
}
