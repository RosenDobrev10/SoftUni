function classStorage(){
    class Storage{                      // Създаваме си клас с име Storage 
        constructor(capacity) {         // Той ще има конструктор с единствен параметър capacity 
            this.capacity = capacity    // Ще има пропърти с име capacity и неговата стойност ще е capacity, което получаваме като създаваме нова инстанция 
            this.storage = []           // Ще имаме пропърти, което е празен масив от обекти, който ще запълним с метода addProduct 
            this.totalCost = 0          // Ще имаме и финална цена, която в началото ще е 0 
        }

        addProduct(product){            // Ще имаме метод да добавяме продукти в нашият склад, като подаваме някакъв продукт 
            this.capacity -= product.quantity   // от капацитета на склада ще изваждаме количеството продукт, което добавяме 
            this.totalCost += product.price * product.quantity  // финалната цена, ще е цената на продукт по неговото количество
            this.storage.push(product)                          // всеки подаден продукт го добавяме в масива под формата на обект 
        }

        getProducts(){              // Ще имаме метод да отпечатваме обектите от склада под формата на стринг 
            return this.storage.map((product) => JSON.stringify(product)).join("\n")
            // Минаваме по всички продукти в склада, които са обекти с map и ги превръщане в стринг s JSON.stringify после получените стрингове ги делим по нов ред  
        }

    }
    let productOne = {name: 'Cucamber',price: 1.50, quantity: 15};
    let productTwo = {name: 'Tomato',price: 0.90, quantity: 25};
    let productThree = {name: 'Bread',price: 1.10, quantity: 8};
    let storage = new Storage(50);
    storage.addProduct(productOne);
    storage.addProduct(productTwo);
    storage.addProduct(productThree);
    console.log(storage.getProducts());
    console.log(storage.capacity);
    console.log(storage.totalCost);
}
classStorage()