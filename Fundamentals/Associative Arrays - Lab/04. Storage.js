function storage(input){

    let storageObject = {}  // Правим празен обект за нашите продукти 

    for (let element of input){                         // Минаваме по масива
        let [product, quantity] = element.split(" ")    // Създаваме променливи за продукта и количеството 
        if (storageObject.hasOwnProperty(product)){     // Ако има такъв продукт вече в обекта 
            storageObject[product] += Number(quantity)  // Добавяме към количеството на продукта, количеството
        } else {                                        // Ако НЯМА такъв продукт в обекта 
            storageObject[product] = Number(quantity)   // Създаваме нов продукт с неговото количество 
        }
    }
    
    for (let product in storageObject){                 // Минаваме през продуктите в обекта 
        console.log(`${product} -> ${storageObject[product]}`)  // Печатаме 
    }
    
}
storage([
'tomatoes 10',
'coffee 5',
'olives 100',
'coffee 40'])

// storage(['apple 50',
// 'apple 61',
// 'coffee 115',
// 'coffee 40'])