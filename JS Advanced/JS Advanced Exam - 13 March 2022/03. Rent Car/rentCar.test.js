const { expect } = require('chai')
const { rentCar } = require('./rentCar')

describe("rentCar tests …", function () {

    describe("searchCar method", function () {

        it("should throw error", function () {
            expect(() => rentCar.searchCar(1, 'Opel')).to.throw(Error)
            expect(() => rentCar.searchCar(true, 'Opel')).to.throw(Error)
            expect(() => rentCar.searchCar({}, 'Opel')).to.throw(Error)
            expect(() => rentCar.searchCar('Opel', 'Opel')).to.throw(Error)
            expect(() => rentCar.searchCar(null, 'Opel')).to.throw(Error)
            expect(() => rentCar.searchCar(undefined, 'Opel')).to.throw(Error)

            expect(() => rentCar.searchCar(['Opel'], true)).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel'], 1)).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel'], {})).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel'], [])).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel'], null)).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel'], undefined)).to.throw(Error)
            expect(() => rentCar.searchCar([], undefined)).to.throw(Error)

            expect(() => rentCar.searchCar(1, 1)).to.throw(Error)
            expect(() => rentCar.searchCar(true, true)).to.throw(Error)
            expect(() => rentCar.searchCar('Opel', 'Opel')).to.throw(Error)
            expect(() => rentCar.searchCar(null, null)).to.throw(Error)
            expect(() => rentCar.searchCar([], [])).to.throw(Error)

            expect(() => rentCar.searchCar(['Opel', 'Lada'], 'Ford')).to.throw(Error)
            expect(() => rentCar.searchCar(['1', '1'], 'BMW')).to.throw(Error)
            expect(() => rentCar.searchCar([1, 1], 'BMW')).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel', 'Lada', 'BMW'], 'Ford')).to.throw(Error)
            expect(() => rentCar.searchCar([], 'Ford')).to.throw(Error)
            expect(() => rentCar.searchCar([null, null, null], 'Ford')).to.throw(Error)
            expect(() => rentCar.searchCar(['Opel', 'Lada', 'BMW'], 'Mercedes')).to.throw(Error)

        });

        it("should return correct result ", function () {

            expect(rentCar.searchCar(['Opel', 'Lada', 'Opel'], 'Lada')).to.equal(`There is 1 car of model Lada in the catalog!`)
            expect(rentCar.searchCar(['BMW', 'Lada', 'BMW'], 'BMW')).to.equal(`There is 2 car of model BMW in the catalog!`)
            expect(rentCar.searchCar(['BMW', 'BMW', 'BMW', 'Opel'], 'BMW')).to.equal(`There is 3 car of model BMW in the catalog!`)

        });

    });

describe("calculatePriceOfCar method", function () {

    it("should throw error", function () {
        expect(() => rentCar.calculatePriceOfCar(1, 'a')).to.throw
        expect(() => rentCar.calculatePriceOfCar(null, null)).to.throw
        expect(() => rentCar.calculatePriceOfCar('a', true)).to.throw
        expect(() => rentCar.calculatePriceOfCar('a', null)).to.throw
        expect(() => rentCar.calculatePriceOfCar(1, 1)).to.throw
        expect(() => rentCar.calculatePriceOfCar(true, 1)).to.throw
        expect(() => rentCar.calculatePriceOfCar('a', -1)).to.throw
        expect(() => rentCar.calculatePriceOfCar('Opel', 1)).to.throw
        expect(() => rentCar.calculatePriceOfCar('Opel', 1.1)).to.throw
        expect(() => rentCar.calculatePriceOfCar('Opel', 0)).to.throw

        expect(rentCar.calculatePriceOfCar('Audi', 1)).to.equal(`You choose Audi and it will cost $36!`)
        expect(rentCar.calculatePriceOfCar('Toyota', 3)).to.equal(`You choose Toyota and it will cost $120!`)
        expect(rentCar.calculatePriceOfCar('Volkswagen', 2)).to.equal(`You choose Volkswagen and it will cost $40!`)
        expect(rentCar.calculatePriceOfCar('BMW', 5)).to.equal(`You choose BMW and it will cost $225!`)
        expect(rentCar.calculatePriceOfCar('Mercedes', 4)).to.equal(`You choose Mercedes and it will cost $200!`)
    });

});

describe("checkBudget method", function () {

    it("should throw error", function () {
        expect(() => rentCar.checkBudget(1, 'a', 'a')).to.throw
        expect(() => rentCar.checkBudget(1, 1, 'a')).to.throw
        expect(() => rentCar.checkBudget('a', 'a', 'a')).to.throw
        expect(() => rentCar.checkBudget('a', 'a', 1)).to.throw
        expect(() => rentCar.checkBudget('a', 1, 1)).to.throw
        expect(() => rentCar.checkBudget('a', 1, 'a')).to.throw
        expect(() => rentCar.checkBudget(1, 'a', 1)).to.throw

        expect(() => rentCar.checkBudget(1.1, 'a', 'a')).to.throw
        expect(() => rentCar.checkBudget(1.1, 1.1, 'a')).to.throw
        expect(() => rentCar.checkBudget('a', 'a', 'a')).to.throw
        expect(() => rentCar.checkBudget('a', 'a', 1.1)).to.throw
        expect(() => rentCar.checkBudget('a', 1.1, 1.1)).to.throw
        expect(() => rentCar.checkBudget('a', 1.1, 'a')).to.throw
        expect(() => rentCar.checkBudget(1.1, 'a', 1.1)).to.throw

        expect(() => rentCar.checkBudget(-1, 'a', 'a')).to.throw
        expect(() => rentCar.checkBudget(-1, -1, 'a')).to.throw
        expect(() => rentCar.checkBudget('a', 'a', 'a')).to.throw
        expect(() => rentCar.checkBudget('a', 'a', -1)).to.throw
        expect(() => rentCar.checkBudget('a', -1, -1)).to.throw
        expect(() => rentCar.checkBudget('a', -1, 'a')).to.throw
        expect(() => rentCar.checkBudget(-1, 'a', -1)).to.throw

        expect(rentCar.checkBudget(2, 1, 1)).to.equal('You need a bigger budget!')
        expect(rentCar.checkBudget(1, 2, 1)).to.equal('You need a bigger budget!')
        expect(rentCar.checkBudget(5, 1, 1)).to.equal('You need a bigger budget!')
        expect(rentCar.checkBudget(1, 5, 1)).to.equal('You need a bigger budget!')

        expect(rentCar.checkBudget(1, 1, 1)).to.equal(`You rent a car!`)
        expect(rentCar.checkBudget(2, 5, 10)).to.equal(`You rent a car!`)

        expect(rentCar.checkBudget(2, 2, 5)).to.equal(`You rent a car!`)
        expect(rentCar.checkBudget(3, 3, 10)).to.equal(`You rent a car!`)

    });

});

});