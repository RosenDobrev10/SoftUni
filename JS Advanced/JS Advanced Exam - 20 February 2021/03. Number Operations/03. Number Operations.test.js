const { expect } = require("chai");
const { numberOperations } = require("./03. Number Operations");

describe("numberOperations Tests …", function () {

    describe("powNumber", function () {
        it("should return correct result", function () {
            expect(numberOperations.powNumber(1)).to.equal(1);
            expect(numberOperations.powNumber(2)).to.equal(4);
            expect(numberOperations.powNumber(0)).to.equal(0);
            expect(numberOperations.powNumber(-1)).to.equal(1);
            expect(numberOperations.powNumber(-2)).to.equal(4);
        });
    });

    describe("numberChecker", function () {
        it("should return error", function () {
            expect(() => numberOperations.numberChecker(undefined)).to.throw(Error);
            expect(() => numberOperations.numberChecker("a")).to.throw(Error);

            expect(numberOperations.numberChecker(99)).to.equal("The number is lower than 100!");
            expect(numberOperations.numberChecker(100)).to.equal("The number is greater or equal to 100!");
            expect(numberOperations.numberChecker(101)).to.equal("The number is greater or equal to 100!");
        });
    });

    describe("sumArrays", function () {
        it("should return correct result", function () {
            expect(numberOperations.sumArrays([10], [20])).to.deep.equal([30]);
            expect(numberOperations.sumArrays([10, 20], [20, 30])).to.deep.equal([30, 50,]);

            expect(numberOperations.sumArrays([10, 20], [20])).to.deep.equal([30, 20,]);
            expect(numberOperations.sumArrays([10], [20, 30])).to.deep.equal([30, 30,]);
        });
    });
});
