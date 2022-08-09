class Vegetable {
    constructor(owner, location) {              // Получаваме две от пропъртитата от конструктора
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];            // Това си го създаваме ние 
    }

    loadingVegetables(vegetables) {
        let uniqueTypes = [];                               // Създаваме масив, в който да пазим уникалните типове продукти

        for (let line of vegetables) {                      // Минаваме по получения масив
            let [type, quantity, price] = line.split(" ");  // Сплитваме и деструктурираме
            quantity = Number(quantity);                    // Парсваме към число 
            price = Number(price);                          // Парсваме към число
            let product = this.availableProducts.find((vegetable) => vegetable.type === type);  
            // Намираме продукта в масива като сравняваме получения тип с тези в масива на всеки продукт, връща първото съвпадение, ако няма връща undefined 
            if (product === undefined) {        // Ако НЯМА такъв продукт в масива 
                let vegetable = {               // Създаваме с изброените пропъртита 
                    type,
                    quantity,
                    price,
                };
                this.availableProducts.push(vegetable);     // Добавяме го към масива
                uniqueTypes.push(type);                     // Дадения тип го добавяме към масива с уникалните продуктите 
            } else {                            // Ако ИМА такъв продукт в масива
                product.quantity += quantity;   // Към количеството на намерения продукт, добавяме полученото от параметъра 
                if (product.price < price) {    // Ако цената на намерения продукт е по-ниско от получената от параметъра 
                    product.price = price;      // Я подменяме 
                }
            }
        }

        return `Successfully added ${uniqueTypes.join(", ")}`;  // Връщаме уникалните продукти, които сме добавили 
    }

    buyingVegetables(selectedProducts) {
        let totalPrice = 0;                         // Правим променлива за цената 

        for (let line of selectedProducts) {            // Минаваме по масива 
            let [type, quantity] = line.split(" ");     // Сплитваме и деструктурираме
            quantity = Number(quantity);                // Парсваме към число 
            let product = this.availableProducts.find((vegetable) => vegetable.type === type);  // Намираме продукта 
            if (product === undefined) {        // Ако го няма 
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);  // Хвърляме грешка 
            }
            if (quantity > product.quantity) {  // Ако количеството, което искат да купят е повече от наличното, грешка 
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }
            totalPrice += product.price * quantity;     // Към цената добавяме, цената за килограм на продукта по количеството
            product.quantity -= quantity;               // Количеството на продукта, намаля с купеното количество
        }

        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;    // Връщаме съобщение 
    }

    rottingVegetable(type, quantity) {
        let product = this.availableProducts.find((vegetable) => vegetable.type === type);  // Намираме продукта 
        if (product === undefined) {                                    // Ако го няма 
            throw new Error(`${type} is not available in the store.`);  // хвърляме грешка 
        }
        if (quantity >= product.quantity) {            // Ако полученото количество е повече или равно на текущото 
            product.quantity = 0;                       // Зануляваме количеството на продукта 
            return `The entire quantity of the ${type} has been removed.`;  // Връщаме съобщение 
        }
        product.quantity -= quantity;                               // Изваждаме от количеството, полученото 
        return `Some quantity of the ${type} has been removed.`;    // Връщаме съобщение
    }

    revision() {
        let revision = [];                          // Правим променлива с празен масив за отделните редове 

        revision.push("Available vegetables:");     // Първия е ред е статичен и го добавяме към масива 

        let sorted = this.availableProducts.sort((a, b) => a.price - b.price);  // Първо сортираме продуктите по тяхната цена 
        let secondRow = sorted.map((veg) => `${veg.type}-${veg.quantity}-$${veg.price}`);   // После сортирания масив го мапваме, за да вземем съобщението
        revision.push(secondRow.join("\n"));        // Добавяме към масив, полученото всяко на нов ред 

        let thirdRow = `The owner of the store is ${this.owner}, and the location is ${this.location}.`;    // Третия ред е статичен 
        revision.push(thirdRow);            // Добавяме го към масива 

        return revision.join("\n");         // Връщаме трите съобщения от масива всяко на нов ред 
    }
}

let vegStore = new Vegetable("Jerrie Munro", "1463 Pette Kyosheta,Sofia");
console.log(
    vegStore.loadingVegetables([
        "Okra 2.5 3.5",
        "Beans 10 2.8",
        "Celery 5.5 2.2",
        "Celery 0.5 2.5",
    ])
);
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());
