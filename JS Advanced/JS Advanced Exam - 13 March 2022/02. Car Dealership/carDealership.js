class CarDealership {
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar(model, horsepower, price, mileage) {
        if (model === "" || horsepower < 0 || price < 0 || mileage < 0) {
            throw new Error("Invalid input!");
        }
        let car = { model, horsepower, price, mileage };
        this.availableCars.push(car);
        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;
    }

    sellCar(model, desiredMileage) {
        const car = this.availableCars.find((auto) => auto.model === model);
        const carIndex = this.availableCars.findIndex((auto) => auto.model === model);

        if (car === undefined) {
            throw new Error(`${model} was not found!`);
        }
        if (car.mileage <= desiredMileage) {
            car.price = car.price;
        } else if (car.mileage - desiredMileage <= 40000) {
            car.price *= 0.95;
        } else if (car.mileage - desiredMileage > 40000) {
            car.price *= 0.9;
        }
        this.availableCars.splice(carIndex, 1);
        this.soldCars.push({
            model,
            horsepower: car.horsepower,
            soldPrice: car.price,
        });
        this.totalIncome += car.price;
        return `${model} was sold for ${car.price.toFixed(2)}$`;
    }

    currentCar() {
        if (this.availableCars.length === 0) {
            return "There are no available cars";
        }
        let result = ["-Available cars:"];
        this.availableCars.forEach((car) =>result.push(`---${car.model} - ${car.horsepower} HP - ${car.mileage.toFixed(2)} km - ${car.price.toFixed(2)}$`));
        return result.join("\n");
    }

    salesReport(criteria) {
        if (criteria !== "horsepower" && criteria !== "model") {
            throw new Error("Invalid criteria!");
        }
        if (criteria === "horsepower") {
            this.soldCars.sort((a, b) => b.horsepower - a.horsepower);
        } else {
            this.soldCars.sort((a, b) => a.model.localeCompare(b.model));
        }
        let result = [
            `-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$`,
            `-${this.soldCars.length} cars sold:`,
        ];
        this.soldCars.forEach((car) =>
            result.push(`---${car.model} - ${car.horsepower} HP - ${car.soldPrice.toFixed(2)}$`));
        return result.join("\n");
    }
}
let dealership = new CarDealership("SoftAuto");
dealership.addCar("Toyota Corolla", 100, 3500, 190000);
dealership.addCar("Mercedes C63", 300, 29000, 187000);
dealership.addCar("Audi A3", 120, 4900, 240000);
dealership.sellCar("Toyota Corolla", 230000);
dealership.sellCar("Mercedes C63", 110000);
console.log(dealership.salesReport("horsepower"));
