function autoEngineeringCompany(arr) {

    let cars = {};                          // Създаваме обект за нашите коли 

    for (let line of arr) {
        let [carBrand, carModel, producedCars] = line.split(" | ");

        if (!cars.hasOwnProperty(carBrand)) {
            cars[carBrand] = {};
        }
        if (!cars[carBrand].hasOwnProperty(carModel)) {
            cars[carBrand][carModel] = 0;
        }
        cars[carBrand][carModel] += Number(producedCars);
    }

    for (let carBrand in cars) {
        console.log(`${carBrand}`);
        for (let [carModel, producedCars] of Object.entries(cars[carBrand])) {
            console.log(`###${carModel} -> ${producedCars}`);
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