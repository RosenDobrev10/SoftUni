function furniture(input) {

    console.log("Bought furniture:");                       // Винаги печатаме, че сме купили мебели 
    let totalSum = 0;                                       // Правим си промемнлива за цялата похарчена сума 

    for (let line of input) {                               // Взимаме всички линии от инпута 
        if (line === "Purchase") {                          // Ако линията е Purchase прекъсваме цикъла 
            break;                                          // прекъсваме цикъла 
        }
        let pattern = />>(?<furniture>[A-Z][A-Za-z]+)<<(?<price>\d+(\.\d+)?)!(?<quantity>\d+)/g;
        // Винаги започва с >> -> Правим група furniture, която ще има Главна буква за начало и след това всякакви букви безрой  ->
        // след това ще има << -> Правим група price, която ще има безброй цифри, след това може да има 0 или 1 точка и цифри след това
        // после има удивителен -> правим група quantity, която ще има цяло число с безброй цифри 
        let match = pattern.exec(line);                     // Взимаме си съвпадението

        while (match !== null) {                            // Въртим цикъла, докато не получим null от съвпадението 
            let furniture = match.groups.furniture;         // Правим променлива като достъпваме името на групата 
            let price = Number(match.groups.price);         // Правим променлива като достъпваме името на групата
            let quantity = Number(match.groups.quantity);   // Правим променлива като достъпваме името на групата
            console.log(furniture);                         // Печатаме всяка мебел 
            totalSum += price * quantity;                   // Пресмятаме общата сума като сумираме единична цена по количество
            match = pattern.exec(line);                     // Подменяме съвпадението всеки път 
        }
    }

    console.log(`Total money spend: ${totalSum.toFixed(2)}`);   // Накрая печатаме сумата до 2-ри знак след дес.запетая
}
furniture([">>Sofa<<312.23!3", ">>TV<<300!5", ">Invalid<<!5", "Purchase"]);

// furniture(['>Invalid<<!4',
// '>Invalid<<!2',
// '>Invalid<<!5',
// 'Purchase'])
