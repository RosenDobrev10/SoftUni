function computerStore(input) {

    let totalPricewithoutTaxes = 0;         // Правим си променлива, в която да трупаме сумата за частите 
    let typeOfClient = input.pop();         // Взимаме типа на клиента, който е винаги на последно място и го махаме 

    for (let price of input) {              // Минаваме по сумите за частите от масива 
        price = Number(price);              // Парсваме ги към число, защото са стринг 
        if (price < 0) {                    // Ако сумата е отрицателна стойност 
            console.log("Invalid price!");  // Печатаме, че цената е невалидна 
        } else {                            // Ако НЕ е отрицателна стойност 
            totalPricewithoutTaxes += price;    // я добавяме към цялата сума
        }
    }

    let totalTaxes = 0.2 * totalPricewithoutTaxes;      // Смятаме колко са таксите, те са 20% от похарчената сума 
    let totalPriceWithTaxes = totalPricewithoutTaxes + totalTaxes;  // общата сума е таксите + похарчената сума без такси 

    if (typeOfClient === "special") {           // Ако клиента ни е специален 
        totalPriceWithTaxes *= 0.9;             // Правим отстъпка в размер на 10 %
    }
    if (totalPriceWithTaxes === 0) {            // Ако похарчената сума е 0 
        console.log("Invalid order!");          // Печатаме, че поръчката е невалидна 
    } else {                                    // Ако похарчената сума е над 0 
    console.log("Congratulations you've just bought a new computer!");
    console.log(`Price without taxes: ${totalPricewithoutTaxes.toFixed(2)}$`);
    console.log(`Taxes: ${totalTaxes.toFixed(2)}$`);
    console.log("-----------");
    console.log(`Total price: ${totalPriceWithTaxes.toFixed(2)}$`);
    }
}
//computerStore(["1050", "200", "450", "2", "18.50", "16.86", "special"]);
// computerStore([ "1023", "15", "-20", "-5.50", "450", "20", "17.66", "19.30", "regular"]);
computerStore((['regular']))
