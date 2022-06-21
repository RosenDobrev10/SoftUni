function catalogue(input){

    let catalogue = []      // Правим празен масив, в който ще трупаме нашите обекти от инпута 
    
    for (let element of input){             // Минаваме по елементите от инпута
        let info = element.split(" : ")     // Делим елемента по интервал : интервал, за да вземем като масив името и цената 
        let name = info[0]                  // Името е нулевия индекс 
        let price = Number(info[1])         // на първи индекс е цената и я правим на число 
        let object = {product:name, price:price}    // Създаваме обект с пропъртита product и price и присвояваме стойности от инпута
        catalogue.push(object)                      // Всеки създаден обект го слагаме в масива
    }

    catalogue.sort((a, b) => a.product.localeCompare(b.product))    // Подреждаме масива по азбучен ред на продуктите 

    let firstLetter = ""                                    // Правим си променлива за първата буква от продукта 
    for (let element of catalogue){                         // Минаваме по елементите от каталога 
        if (element.product.charAt(0) === firstLetter){     // ако първата буква на продукта е като първата буква преди това
            console.log(`  ${element.product}: ${element.price}`)   // Директно печатаме продукта и цената му 
        } else {                                            // ако първата буква на продукта не е срещана до сега 
            firstLetter = element.product.charAt(0)          // Променяме първата буква да ни е първата буква от продукта 
            console.log(firstLetter)                        // Печатаме първата буква 
            console.log(`  ${element.product}: ${element.price}`)   // и след това печатаме продукта и цената му 
        }
    }

}
catalogue([
'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10', 
'Boiler : 300',  
'Apple : 1.25',  
'Anti-Bug Spray :  15',
'T-Shirt : 10' 
])