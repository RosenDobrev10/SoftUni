function fancyBarcodes(input) {

    let n = input.shift();  // Премахване първия елемент, за да не ни дава патърна null

    for (let barcodes of input) {                               // Минаваме по всички баркодове от инпута 
        let pattern = /@#+[A-Z]([A-Za-z0-9]){4,}[A-Z]@#+/g;
        // Почваме с @ и #(безброй) => После имаме главна буква, после поне 4 главни или малки букви,
        // може и цифри и завършва с главна буква(ОБЩО ПОНЕ 6 СИМВОЛА) => Завършва пак с @ и #(безброй)
        let match = barcodes.match(pattern);                    // Взимаме съвпадението на патерна с баркода 
        if (match === null) {                                   // Ако няма съвпадение 
            console.log("Invalid barcode");                     // Печатаме невадилен баркод 
        } else {                                                // Ако има съвпадение 
            let barcode = "";                                   // Създаваме празен стринг, в който ще попълваме нашите цифри
            for (let letter of match[0]) {                      // Минаваме по всяка буква от съвпадението 
                if (letter.charCodeAt() >= 48 && letter.charCodeAt() <= 57) {   // Ако буквата е ЦИФРА от 0 до 9 
                    barcode += letter;                                          // я добавяме към баркода 
                } 
            }
            if (barcode.length === 0){                           // Ако в баркода не сме добавяли цифри
                console.log("Product group: 00")                 // групата ни е 00 
            } else {                                             // Ако в баркода сме добавяли цифри
            console.log(`Product group: ${barcode}`);            // групата ни е това, което сме получили 
            }
        }
    }
}
fancyBarcodes([
    "6",
    "@###Val1d1teM@###",
    "@#ValidIteM@#",
    "##InvaliDiteM##",
    "@InvalidIteM@",
    "@#Invalid_IteM@#",
    "@#ValiditeM@#",
]);
