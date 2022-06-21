function classVehicle(){

    class Vehicle{                                  // Създаваме си клас МПС
        constructor(type, model, parts, fuel) {     // Конструктора ни има 4-ри параметъра 
            this.type = type                        // Създаваме си пропъртита 
            this.model = model                      // Създаваме си пропъртита 
            this.parts = parts                      // Създаваме си пропъртита 
            this.fuel = fuel                        // Създаваме си пропъртита 
            this.parts.quality = parts.engine * parts.power // Създаваме си за качеството 
        }

        drive(fuelLoss){                // Създаваме функция
            this.fuel -= fuelLoss       // От горивото, н нашият обект вадим загубата на гориво, която е подадена като параметър
        }

    }

    let parts = { engine: 6, power: 100 };
    let vehicle = new Vehicle('Opel', 'Astra', parts, 200);
    vehicle.drive(100)
    console.log(vehicle.fuel);
    console.log(vehicle.parts.quality);
    console.log(vehicle.type)
    console.log(vehicle.model)
}
classVehicle()