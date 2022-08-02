const { expect } = require("chai"); // Изисквам от библиотеката chai функцията expect
const { mathEnforcer } = require("./04. Math Enforcer");

describe(`Math Enforcer tests`, () => {

    describe(`AddFive tests`, () => {

        it(`Test 1: should return undefined with non-number param`, () => {
            expect(mathEnforcer.addFive("a")).to.be.undefined;
        });

        it(`Test 2: should return 8 with positive number(3) as param`, () => {
            expect(mathEnforcer.addFive(3)).to.equal(8);
        });

        it(`Test 3: should return 2 with negative number(-3) as param`, () => {
            expect(mathEnforcer.addFive(-3)).to.equal(2);
        });

        it(`Test 4: should return 6.1 with floating-point number(1.1) as param`, () => {
            expect(mathEnforcer.addFive(1.1)).to.closeTo(6.1, 0.01);
        });
    });

    describe(`SubtractTen tests`, () => {

        it(`Test 1: should return undefined with non-number param`, () => {
            expect(mathEnforcer.subtractTen("a")).to.be.undefined;
        });

        it(`Test 2: should return 1 with positive number(11) as param`, () => {
            expect(mathEnforcer.subtractTen(11)).to.equal(1);
        });

        it(`Test 3: should return -21 with negative number(-11) as param`, () => {
            expect(mathEnforcer.subtractTen(-11)).to.equal(-21);
        });

        it(`Test 4: should return 1.1 with floating-point number(11.1) as param`, () => {
            expect(mathEnforcer.subtractTen(11.1)).to.closeTo(1.1, 0.01);
        });
    });

    describe(`Sum tests`, () => {

        it(`Test 1: should return undefined with first non-number param`, () => {
            expect(mathEnforcer.sum("a", 1)).to.be.undefined;
        });

        it(`Test 2: should return undefined with second non-number param`, () => {
            expect(mathEnforcer.sum(1, 'a')).to.be.undefined;
        });

        it(`Test 3: should return undefined with 2 non-number params`, () => {
            expect(mathEnforcer.sum("a", "b")).to.be.undefined;
        });

        it(`Test 4: should return 8 with two positive numbers(3 and 5) as params`, () => {
            expect(mathEnforcer.sum(3, 5)).to.equal(8);
        });

        it(`Test 5: should return 2 with negative number(-3) and positive number(5) as params`, () => {
            expect(mathEnforcer.sum(-3, 5)).to.equal(2);
        });

        it(`Test 6: should return -8 with two negative numbers(-3 and -5) as params`, () => {
            expect(mathEnforcer.sum(-3, -5)).to.equal(-8);
        });

        it(`Test 7: should return 3.1 with one floating-point number(1.1 and 2) as params`, () => {
            expect(mathEnforcer.sum(1.1, 2)).to.closeTo(3.1, 0.01);
        });

        it(`Test 8: should return 3.3 with two floating-point numbers(1.1 and 2.2) as params`, () => {
            expect(mathEnforcer.sum(1.1, 2.2)).to.closeTo(3.3, 0.01);
        });
    });
});
