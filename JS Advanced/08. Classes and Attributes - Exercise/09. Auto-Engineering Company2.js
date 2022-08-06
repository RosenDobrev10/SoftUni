function autoEngineeringCompany(arr) {

    let cars = {};                          // Създаваме обект за нашите коли 

    arr.forEach(line =>  {
        let [carBrand, carModel, producedCars] = line.split(" | ");

        if (cars[carBrand] === undefined) {
            cars[carBrand] = {};
        }
        if (cars[carBrand][carModel] === undefined) {
            cars[carBrand][carModel] = 0;
        }
        cars[carBrand][carModel] += Number(producedCars);
    })

    for (let brand in cars){
        console.log(brand)
        Object.entries(cars[brand]).forEach(model => console.log(`###${model[0]} -> ${model[1]}`))
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