const { expect } = require("chai");
const { sum } = require("./04. Sum of Numbers");

describe("Sum of Numbers tests", () => {
    it("Test 1: works with number array", () => {
        expect(sum([1, 2, 3])).to.equal(6);
    });

    it("Test 2: works with number array as string", () => {
        expect(sum(["1", "2", "3"])).to.equal(6);
    });

    it("Test 2: returns NaN, when 1 param is not number", () => {
        expect(sum(["a", "2", "3"])).to.be.NaN;
    });
});
