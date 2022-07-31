function solution() {

    const recipes = {           // Декларираме обект с всички рецепти и нужните съставки

        apple: {                // Декларираме обект с нужните съставки за приготвяне на ябълка 
            carbohydrate: 1,
            flavour: 2,
        },

        lemonade: {             // Декларираме обект с нужните съставки за приготвяне на лимонада
            carbohydrate: 10,
            flavour: 20,
        },

        burger: {               // Декларираме обект с нужните съставки за приготвяне на бургер
            carbohydrate: 5,
            fat: 7,
            flavour: 3,
        },

        eggs: {                 // Декларираме обект с нужните съставки за приготвяне на яйца
            protein: 5,
            fat: 1,
            flavour: 1,
        },

        turkey: {               // Декларираме обект с нужните съставки за приготвяне на пуйка
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10,
        },
    };

    const stock = {         // Декларираме обект, в който ще пазим нашите съставки на склад 
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    const commands = {      // Декларираме обект, в който ще пазим командите, които получаваме от функцията manager
        restock,
        prepare,        
        report,
    };

    return manager;

    function manager(line) {                                    // Ф-ята приема параметър самия текст 
        const [command, param, quantity] = line.split(" ");     // Сплитваме по разстояние, за да получим трите параметъра 
        return commands[command](param, quantity);              
        // Връщаме изпълнена функция като бръкнем в командите по получената командата с параметрите 
    }

    function restock(ingredient, quantity) {          // Създаваме функция restock, която получава като параметри съставката и количеството и 
        stock[ingredient] += Number(quantity);        // Към количеството в склада добавяме подаденото на функцията 
        return "Success";                             // Връщаме стринга Success
    }

    function prepare(recipe, quantityMeals) {    // Създаваме функция prepare, която получава като параметри рецептата и колко пъти да я сготвим 
        quantityMeals = Number(quantityMeals);          // Превръщаме бройката на ястията към число 
        const order = Object.entries(recipes[recipe]);  // Правим нужните съставки на поръчката на двойки с ключ и стойност 
        order.forEach((ingredient) => (ingredient[1] *= quantityMeals));
        // Минаваме по поръчката като взимаме всяка съставка и нейната стойност умножаваме по броя ястия 

        for (let [ingredient, requiredQuantity] of order) {    // Минаваме отново по поръчката, като взимаме съставката и нужното количество за приготвянето и 
            if (stock[ingredient] < requiredQuantity) {         // Ако количеството на склад е по-малко от нужното количество
                return `Error: not enough ${ingredient} in stock`;  // Прекратяваме функцията и връщаме съобщението 
            }
        }

        order.forEach(([ingredient, requiredQuantity]) => (stock[ingredient] -= requiredQuantity));
        // Минаваме пак по поръчката  и от всяка нужна съставка, изваждаме количеството и от склада 
        return "Success";   // Връщаме стринга, че сме успели да сготвим поръчката 
    }

    function report() {     // Създаваме функцията report, която не приема параметри, а печата какво имаме на склад като съставки
        return `protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`;
        // Достъпваме склада и съставките, които имаме 
    }
}
let manager = solution();
console.log(manager("restock flavour 50")); // Success
console.log(manager("prepare lemonade 4")); // Error: not enough carbohydrate in stock
console.log(manager("report"));
