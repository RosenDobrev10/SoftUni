function softuniBarIncome(input) {

    let income = 0;                         // Създаваме брояч за крайната сума 

    for (let line of input) {               // Минаваме по всяка линия от инпута
        if (line === "end of shift") {      // Ако линията е end of shift 
            break;                          // Прекъсваме цикъла 
        }
        let pattern = /\%(?<customer>[A-Z][a-z]+)\%[^|$%.]*?<(?<product>\w+)>[^|$%.]*?\|(?<quantity>\d+)\|[^|$%.]*?(?<price>\d+(\.\d+)?)\$/g;
        // Трябва да започва с % -> Правим група customer, която трябва да започва с главна буква и след това неограничен брой пъти малка буква
        // трябва да има след това % -> Между customer и product може да има всякакви символи БЕЗ |, $, % и . -> Трябва да има < -> Правим група 
        // product, която може да има всякакви alphanumerical символи -> трябва да има > -> Между product и quantity може да има всякакви символи БЕЗ |, $, % и .
        // трябва да има | -> правим група quantity, която трябва да има цяло число неограничено голямо -> трябва да има | -> Между product и price може да има всякакви символи БЕЗ |, $, % и .
        // Правим група price, която ще има цяло число или такова със плаваща запетая -> трябва да завършва с $ 
        let match = pattern.exec(line);                 // Взимаме си съвпадението 
        if (match !== null) {                           // Ако съвпадението не е null
            let customer = match.groups.customer;       // Взимаме като обект customer 
            let product = match.groups.product;         // Взимаме като обект product 
            let quantity = Number(match.groups.quantity);   // Взимаме като обект quantity като число 
            let price = Number(match.groups.price);     // Взимаме като обект price като число 
            console.log(`${customer}: ${product} - ${(quantity * price).toFixed(2)}`); // Печатаме ги, като се изисква до втория знак след дес. запетая
            income += quantity * price;     // към оборота прибавяме покупката на клиента в пари 
        }
    }
    console.log(`Total income: ${income.toFixed(2)}`);  // Печатаме оборота до втория знак след дес. запетая 
}
softuniBarIncome([
    "%George%<Croissant>|2|10.3$",
    "%Peter%<Gum>|1|1.3$",
    "%Maria%<Cola>|1|2.4$",
    "end of shift",
]);
