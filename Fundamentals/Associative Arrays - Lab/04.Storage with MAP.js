function storage(input){

    let storageMap = new Map()  // Създаваме си обект от тип МАП 

    for (let element of input){                         // Минаваме по елементите от масива 
        let [product, quantity] = element.split(" ")    // Създаваме две променливи, продукт и количество
        if (storageMap.has(product)){                   // Ако в обекта има такъв продукт вече
            let currentQuantity = storageMap.get(product)   // Взимаме текущото количество
            storageMap.set(product, currentQuantity + Number(quantity)) // и на същия продукт сетваме предишното със сегашната количество събрани 
        } else {                                            // Ако в обекта няма такъв продукт
        storageMap.set(product, Number(quantity))           // Създаваме такъв, като правим количеството на число 
        }
    }

    for (let [product,quantity] of storageMap){         // Минаваме и създаваме продукт и количество от обектите от МАПА
        console.log(`${product} -> ${quantity}`)        // Печатаме, продукта и количеството му 
    }

}
storage([
'tomatoes 10',
'coffee 5',
'olives 100',
'coffee 40'])