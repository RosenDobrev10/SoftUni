function needForSpeedIII(input) {
    const cars = {};
    const n = Number(input.shift());
    for (let i = 0; i < n; i++) {
        const [car, mileage, fuel] = input.shift().split("|");
        cars[car] = { mileage: Number(mileage), fuel: Number(fuel) };
    }
    while (input[0] !== "Stop") {
        const [command, car, param1, param2] = input.shift().split(" : ");
        if (command === "Drive") {
            if (cars[car].fuel - Number(param2) <= 0) {
                console.log("Not enough fuel to make that ride");
            } else {
                cars[car].mileage += Number(param1);
                cars[car].fuel -= Number(param2);
                console.log(`${car} driven for ${param1} kilometers. ${param2} liters of fuel consumed.`);
            }
            if (cars[car].mileage >= 100000){
                delete cars[car];
                console.log(`Time to sell the ${car}!`)
            }
        } else if (command === "Refuel") {
            let currentFuel = cars[car].fuel;
            cars[car].fuel + Number(param1) >= 75 ? cars[car].fuel = 75 : cars[car].fuel += Number(param1);
            console.log(`${car} refueled with ${cars[car].fuel - currentFuel} liters`);
        } else if (command === "Revert") {
            if (cars[car].mileage - Number(param1) < 10000) {
                cars[car].mileage = 10000;
            } else {
                cars[car].mileage -= Number(param1);
                console.log(`${car} mileage decreased by ${param1} kilometers`);
            }
        }
    }
    for (let car in cars) {
        console.log(`${car} -> Mileage: ${cars[car].mileage} kms, Fuel in the tank: ${cars[car].fuel} lt.`);
    }
}
