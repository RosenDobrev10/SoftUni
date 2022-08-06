function autoEngineeringCompany(arr) {

    let cars = {};                                      // Създаваме обект за нашите коли 

    for (let line of arr) {                             // Минаваме по всеки ред от нашият масив 
        let [carBrand, carModel, producedCars] = line.split(" | "); // Деструктурираме като сплитваме

        if (!cars.hasOwnProperty(carBrand)) {                       // Ако нямаме такава марка в нашите коли 
            cars[carBrand] = {};                                    // Създаваме празен обект към тази марка 
        }
        if (!cars[carBrand].hasOwnProperty(carModel)) {             // Ако нямаме такъв модел към тази марка
            cars[carBrand][carModel] = 0;                           // Създаваме такъв модел и слагаме количеството на 0 
        }
        cars[carBrand][carModel] += Number(producedCars);           // Към количеството на този модел, добавяме новото 
    }

    for (let [carBrand, carModel] of Object.entries(cars)) {                // Минаваме по KVP на cars 
        console.log(`${carBrand}`);                                         // Печатаме марката на колата, която е на нулев индекс
        for (let [model, producedCars] of Object.entries(carModel)) {      // На първи индекс е обект с моделите на колите 
            console.log(`###${model} -> ${producedCars}`);                  // На първи индекс е модела, на втори индекс е броя коли
        }
    }
}
autoEngineeringCompany([
    "Audi | Q7 | 1000",

    "Audi | Q6 | 100",

    "BMW | X5 | 1000",

    "BMW | X6 | 100",

    "Citroen | C4 | 123",

    "Volga | GAZ-24 | 1000000",

    "Lada | Niva | 1000000",

    "Lada | Jigula | 1000000",

    "Citroen | C4 | 22",

    "Citroen | C5 | 10",
]);
