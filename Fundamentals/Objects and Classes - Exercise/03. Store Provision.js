function storeProvision(localStore, order){

    let localStoreObject = {}   // Създаваме си масив, в който ще натрупаме нашите продукти и тяхното количество

    for (let i = 0; i < localStore.length; i += 2 ){    // Минаваме по всички четни елементи, които са продуктите 
        let currentProduct = localStore[i]              // Създаваме си променлива за текущия ни продукт 
        let quantity = Number(localStore[i + 1])        // Взимаме количеството на дадения продукт 
        localStoreObject[currentProduct] = quantity     // Създаваме пропърти с името на продукта към обекта и му даваме и стойност  
    }

    for (let j = 0; j < order.length; j += 2 ){         // Минаваме по същия начин и по втория масив 
        let currentProduct = order[j]                   // Създаваме си променлива за текущия ни продукт 
        let quantity = Number(order[j + 1])             // Взимаме количеството на дадения продукт
        if (!localStoreObject.hasOwnProperty(currentProduct)){  // Ако в обекта ни НЯМА такъв продукт
            localStoreObject[currentProduct] = 0                // го добавяме първоначално със стойност 0 
        }
        localStoreObject[currentProduct] += quantity // след това добавяме стойността.АКО ГО ИМА просто добавяме към наличното количество
    }
     for (let property in localStoreObject) {   // минаваме с един for in цикъл през свойствата на нашият обект 
    // for (let property of Object.keys(localStoreObject)) { = По този начин обхождаме ключовете на обект с for of
        console.log(`${property} -> ${localStoreObject[property]}`) // Печатаме propertytata с техните стойности 
    }
}
storeProvision(
['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
    
['Flour', '44', 'Oil', '12', 'Pasta', '7','Tomatoes', '70', 'Bananas', '30'])

// storeProvision(
// [ 'Salt', '2', 'Fanta', '4', 'Apple', '14', 'Water', '4', 'Juice', '5' ],
// [ 'Sugar', '44', 'Oil', '12', 'Apple', '7', 'Tomatoes', '7', 'Bananas', '30' ])