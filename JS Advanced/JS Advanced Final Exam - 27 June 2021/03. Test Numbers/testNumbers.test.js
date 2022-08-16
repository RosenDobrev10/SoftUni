const { expect } = require("chai");
const { testNumbers } = require("./testNumbers");

describe("testNumbers Tests …", function () {

    describe("sumNumbers method tests", function () {

        it("should return undefined", function () {
            expect(testNumbers.sumNumbers("a", 1)).to.equal(undefined);
            expect(testNumbers.sumNumbers(true, 1)).to.equal(undefined);
            expect(testNumbers.sumNumbers("1", 1)).to.equal(undefined);

            expect(testNumbers.sumNumbers(1, "a")).to.equal(undefined);
            expect(testNumbers.sumNumbers(1, true)).to.equal(undefined);
            expect(testNumbers.sumNumbers(1, "1")).to.equal(undefined);

            expect(testNumbers.sumNumbers("a", "a")).to.equal(undefined);
            expect(testNumbers.sumNumbers(true, true)).to.equal(undefined);
            expect(testNumbers.sumNumbers("1", "1")).to.equal(undefined);
        });

        it("should return correct result", function () {
            expect(testNumbers.sumNumbers(1, 1)).to.equal("2.00");
            expect(testNumbers.sumNumbers(0, 0)).to.equal("0.00");
            expect(testNumbers.sumNumbers(0, 1.115)).to.equal("1.11");
            expect(testNumbers.sumNumbers(0, 1.116)).to.equal("1.12");
            expect(testNumbers.sumNumbers(1.111, 1.116)).to.equal("2.23");
            expect(testNumbers.sumNumbers(1.11, 1.116)).to.equal("2.23");
            expect(testNumbers.sumNumbers(2.2, 3.222)).to.equal("5.42");

            expect(testNumbers.sumNumbers(1, 1.1)).to.equal("2.10");
            expect(testNumbers.sumNumbers(1.1, 1)).to.equal("2.10");
            expect(testNumbers.sumNumbers(1.1, 1.1)).to.equal("2.20");

            expect(testNumbers.sumNumbers(1, 0)).to.equal("1.00");
            expect(testNumbers.sumNumbers(0, 1)).to.equal("1.00");

            expect(testNumbers.sumNumbers(1, -1)).to.equal("0.00");
            expect(testNumbers.sumNumbers(-1, 1)).to.equal("0.00");

            expect(testNumbers.sumNumbers(-1, -1)).to.equal("-2.00");
        });
    });

    describe("numberChecker method tests", function () {
        it("should throw error", function () {
            expect(() => testNumbers.numberChecker(undefined)).to.throw(Error);
            expect(() => testNumbers.numberChecker("a")).to.throw(Error);
        });

        it("should return number is even", function () {
            expect(testNumbers.numberChecker(2)).to.equal("The number is even!");
            expect(testNumbers.numberChecker("2")).to.equal("The number is even!");
            expect(testNumbers.numberChecker(0)).to.equal("The number is even!");
        });

        it("should return number is odd", function () {
            expect(testNumbers.numberChecker(1)).to.equal("The number is odd!");
            expect(testNumbers.numberChecker("1")).to.equal("The number is odd!");
            expect(testNumbers.numberChecker(3)).to.equal("The number is odd!");
        });
    });

    describe("averageSumArray method tests", function () {
        it("should return correct result ", function () {
            expect(testNumbers.averageSumArray([])).to.deep.equal(NaN);
            expect(testNumbers.averageSumArray([10])).to.equal(10);
            expect(testNumbers.averageSumArray([10, 20])).to.equal(15);
            expect(testNumbers.averageSumArray([10, 20, 30])).to.equal(20);
        });
    });
});
