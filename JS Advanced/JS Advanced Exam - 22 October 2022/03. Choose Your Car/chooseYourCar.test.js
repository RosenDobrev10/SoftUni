const { expect } = require('chai');
const { chooseYourCar } = require('./chooseYourCar');

describe("chooseYourCar Tests", function () {

    describe("choosingType method tests ", function () {
        it("should throw Error, when year is invalid", function () {
            expect(() => chooseYourCar.choosingType('Sedan', 'black', 1899)).to.throw(Error);
        });
        it("should throw Error, when year is invalid", function () {
            expect(() => chooseYourCar.choosingType('Sedan', 'black', 2023)).to.throw(Error);
        });
        it("should throw Error, when type is invalid", function () {
            expect(() => chooseYourCar.choosingType('Coupet', 'black', 2020)).to.throw(Error);
        });
        it("should return correct, when year is greater than 2010", function () {
            expect(chooseYourCar.choosingType('Sedan', 'black', 2011)).to.equal(`This black Sedan meets the requirements, that you have.`);
        });
        it("should return correct, when year is exactly 2010", function () {
            expect(chooseYourCar.choosingType('Sedan', 'black', 2010)).to.equal(`This black Sedan meets the requirements, that you have.`);
        });
        it("should return correct, when year is exactly 2010", function () {
            expect(chooseYourCar.choosingType('Sedan', 'black', 2009)).to.equal(`This Sedan is too old for you, especially with that black color.`);
        });
    });

    describe("brandName method tests ", function () {
        it("should throw Error, when brands is not array", function () {
            expect(() => chooseYourCar.brandName(1, 1)).to.throw(Error);
        });
        it("should throw Error, when brandIndex is not integer", function () {
            expect(() => chooseYourCar.brandName(['Lada'], 'a')).to.throw(Error);
        });
        it("should throw Error, when brandIndex is not integer", function () {
            expect(() => chooseYourCar.brandName(['Lada'], 1.1)).to.throw(Error);
        });
        it("should throw Error, when brandIndex is not integer", function () {
            expect(() => chooseYourCar.brandName([], -1)).to.throw(Error);
        });
        it("should throw Error, when brandIndex is not integer", function () {
            expect(() => chooseYourCar.brandName(['Lada'], 1)).to.throw(Error);
        });
        it("should throw Error, when brandIndex is not integer", function () {
            expect(() => chooseYourCar.brandName(['Lada'], 2)).to.throw(Error);
        });
        it("should be correct", function () {
            expect(chooseYourCar.brandName(['Lada', 'Volga'], 1)).to.equal('Lada');
        });
        it("should be correct", function () {
            expect(chooseYourCar.brandName(['Lada', 'Volga', 'Jigula'], 1)).to.equal('Lada, Jigula');
        });
    });

    describe("carFuelConsumption method tests ", function () {
        it("should throw Error, when distanceInKilometers is not number", function () {
            expect(() => chooseYourCar.carFuelConsumption('a', 1)).to.throw(Error);
        });
        it("should throw Error, when distanceInKilometers is zero", function () {
            expect(() => chooseYourCar.carFuelConsumption(0, 1)).to.throw(Error);
        });
        it("should throw Error, when distanceInKilometers is negative", function () {
            expect(() => chooseYourCar.carFuelConsumption(-1, 1)).to.throw(Error);
        });
        it("should throw Error, when consumptedFuelInLiters is not number", function () {
            expect(() => chooseYourCar.carFuelConsumption(1, 'a')).to.throw(Error);
        });
        it("should throw Error, when consumptedFuelInLiters is zero", function () {
            expect(() => chooseYourCar.carFuelConsumption(1, 0)).to.throw(Error);
        });
        it("should throw Error, when consumptedFuelInLiters is negative", function () {
            expect(() => chooseYourCar.carFuelConsumption(1, -1)).to.throw(Error);
        });
        it("should be correct", function () {
            expect(chooseYourCar.carFuelConsumption(100, 7)).to.equal(`The car is efficient enough, it burns 7.00 liters/100 km.`);
        });
        it("should be correct", function () {
            expect(chooseYourCar.carFuelConsumption(100, 6)).to.equal(`The car is efficient enough, it burns 6.00 liters/100 km.`);
        })
        it("should be correct", function () {
            expect(chooseYourCar.carFuelConsumption(100, 8)).to.equal(`The car burns too much fuel - 8.00 liters!`);
        })
    });

});
