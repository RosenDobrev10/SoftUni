function needForSpeedIII(input) {

    let n = Number(input.shift());                  // Взимаме броя на колите от първия ред 
    let cars = {};                                  // Създаваме обект с нашите коли 

    for (let i = 0; i < n; i++) {                   // Минаваме по броя на колите 
        let line = input.shift().split("|");        // Взимаме първата линията от инпута и я делим по |
        let car = line[0];                          // На нулев индекс е колата 
        let mileage = Number(line[1]);              // на първи индекс е пробега
        let fuel = Number(line[2]);                 // на втори индекс е горивото
        cars[car] = { mileage, fuel };              // Създаваме обект със свойство името на колата и стойности пробег и гориво 
    }

    while (input[0] !== "Stop") {                   // Докато получим на нулев индекс от инпута Стоп, въртим цикъла 
        let line = input.shift().split(" : ");      // Взимаме линяита от инпута и я делим по интервал : интервал 
        let command = line[0];                      // на нулев индекс е командата
        let car = line[1];                          // на първи индекс е колата 

        if (command === "Drive") {                  // Ако командата е Drive
            let distance = Number(line[2]);         // на втори индекс е дистанцията 
            let fuel = Number(line[3]);             // на трети индекс е нужното гориво за изминаване на дистанцията 
            if (cars[car].fuel < fuel) {            // Ако горивото е по-малко от нужното гориво 
                console.log("Not enough fuel to make that ride");   // Печатаме 
            } else {                                // Ако горивото е достатъчно за изминаване на разстоянието  
                cars[car].mileage += distance;      // Увеличаваме пробега с дистанцията 
                cars[car].fuel -= fuel;             // Намаляме горивото, с това което сме изхарчили 
                console.log(`${car} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`);  // Печатаме 
            }
            if (cars[car].mileage >= 100000) {              // Ако пробега е станал повече от 100 000 км 
                console.log(`Time to sell the ${car}!`);    // Печатаме 
                delete cars[car];                           // Продаваме колата и я изтриваме от обекта с колите 
            }

        } else if (command === "Refuel") {          // Ако командата е Refuel
            let fuel = Number(line[2]);             // на втори индекс е горивото, което зареждаме 
            let currentFuel = cars[car].fuel;       // Взимаме си горивото, което имаме до момента 
            if (cars[car].fuel + fuel <= 75) {      // Ако наличното + зареденото е по-малко или равно на 75(максимума)
                cars[car].fuel += fuel;             // Зареждаме, толкова колкото сме получили 
                console.log(`${car} refueled with ${fuel} liters`); // Печатаме 
            } else {                                // Ако наличното + зареденото е повече от 75(максимума)
                cars[car].fuel = 75;                // Зареждаме, само до 75(максимума)
                console.log(`${car} refueled with ${75 - currentFuel} liters`); // Печатаме
            }

        } else if (command === "Revert") {          // Ако командата е Revert
            let kilometers = Number(line[2]);       // на втори индекс са превъртените назад километри от пробега 
            cars[car].mileage -= kilometers;        // Изваждаме от пробега, километрите които са превъртени назад 
            if (cars[car].mileage < 10000) {        // Ако пробега стане по-малко от 10 000 км 
                cars[car].mileage = 10000;          // Слагаме пробега да е равен на 10 000 км и не печатаме нищо 
            } else {                                // Ако пробега е над  10 000 км
                console.log(`${car} mileage decreased by ${kilometers} kilometers`);    // Печатаме 
            }
        }

    }

    for (let car of Object.entries(cars)) {         // Минаваме по всяка кола от обекта, като я превръщаме в масив 
        console.log(`${car[0]} -> Mileage: ${car[1].mileage} kms, Fuel in the tank: ${car[1].fuel} lt.`);
        // на нулев индекс е името на колата(ключа), на първи индекс са пробега и горивото(стойностите )
    }
}
needForSpeedIII([
    "3",
    "Audi A6|38000|62",
    "Mercedes CLS|11000|35",
    "Volkswagen Passat CC|45678|5",
    "Drive : Audi A6 : 543 : 47",
    "Drive : Mercedes CLS : 94 : 11",
    "Drive : Volkswagen Passat CC : 69 : 8",
    "Refuel : Audi A6 : 50",
    "Revert : Mercedes CLS : 500",
    "Revert : Audi A6 : 30000",
    "Stop",
]);
