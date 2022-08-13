const { expect } = require("chai");
const { dealership } = require("./dealership");

describe("dealership Tests …", function () {

    describe("newCarCost method", function () {
        it("should correct price ", function () {
            expect(dealership.newCarCost("Audi TT 8Z", 100)).to.equal(100);
            expect(dealership.newCarCost("Audi A4 B8", 30000)).to.equal(15000);
            expect(dealership.newCarCost("Audi A6 4K", 30000)).to.equal(10000);
            expect(dealership.newCarCost("Audi A8 D5", 30000)).to.equal(5000);
            expect(dealership.newCarCost("Audi TT 8J", 30000)).to.equal(16000);
        });
    });

    describe("carEquipment method", function () {
        it("should correct price ", function () {
            expect(dealership.carEquipment(["a", "b", "c"], [0, 1])).to.deep.equal(["a","b",]);
            expect(dealership.carEquipment(["a", "b", "c"], [1, 2])).to.deep.equal(["b","c",]);
        });
    });

    describe("euroCategory method", function () {
        it("should correct price ", function () {
            expect(dealership.euroCategory(3)).to.equal(`Your euro category is low, so there is no discount from the final price!`);
            expect(dealership.euroCategory(4)).to.equal(`We have added 5% discount to the final price: 14250.`);
            expect(dealership.euroCategory(5)).to.equal(`We have added 5% discount to the final price: 14250.`);
        });
    });
});
