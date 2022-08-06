const { expect } = require("chai");
const PaymentPackage = require("./12. Payment Package");

describe("Payment Package tests", () => {
    it('constructor', () => {
        let pp = new PaymentPackage('Name', 100);

        expect(pp.name).to.equal('Name');
        expect(pp.value).to.equal(100);
        expect(pp.VAT).to.equal(20);
        expect(pp.active).to.equal(true);
    });

    describe("constructor tests", () => {
        it(`Test 1: should throw error, when name is not string`, () => {
            expect(() => new PaymentPackage(123, 123)).to.throw(Error);
        });

        it(`Test 2: should throw error, when value is not number`, () => {
            expect(() => new PaymentPackage("abc", "abc")).to.throw(Error);
        });

        it(`Test 3: should throw error, when name is not string and value is not number`, () => {
            expect(() => new PaymentPackage(123, "abc")).to.throw(Error);
        });

        it(`Test 4: should throw error, when name is empty string`, () => {
            expect(() => new PaymentPackage("", 123)).to.throw(Error);
        });

        it(`Test 5: should throw error, when value is negative number`, () => {
            expect(() => new PaymentPackage("abc", -1)).to.throw(Error);
        });

        it(`Test 6: should throw error, when name is empty string and value is negative number`, () => {
            expect(() => new PaymentPackage("", -1)).to.throw(Error);
        });

        it(`Test 7: should return correct name`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(pp.name).to.equal("abc");
        });

        it(`Test 8: should return correct value`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(pp.value).to.equal(123);
        });

        it(`Test 9: should return correct value if it set to 0`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(pp.value = 0).to.equal(0);
        });
    });

    describe("name tests", () => {
        it(`Test 1: should throw errow, when name is empty string`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.name = "")).to.throw(Error);
        });

        it(`Test 2: should throw errow, when name is number`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.name = 1)).to.throw(Error);
        });

        it(`Test 3: should return correct new name`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(pp.name = 'cba').to.equal('cba');
        });
    });

    describe("value tests", () => {
        it(`Test 1: should throw errow, when value is empty string`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.value = "abc")).to.throw(Error);
        });

        it(`Test 2: should throw errow, when value is number`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.value = -1)).to.throw(Error);
        });

        it(`Test 3: should return correct new value`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(pp.value = 321).to.equal(321);
        });
    });

    describe("VAT tests", () => {
        it(`Test 1: should throw errow, when VAT is not number`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.VAT = "abc")).to.throw(Error);
        });

        it(`Test 2: should throw errow, when VAT is negative number`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.VAT = -1)).to.throw(Error);
        });

        it(`Test 3: should return correct new VAT`, () => {
            pp = new PaymentPackage("abc", 123);
            expect((pp.VAT = 123)).to.equal(123);
        });

        it(`Test 4: should return correct new VAT`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(pp.VAT = 0).to.equal(0);
        });
    });

    describe("active tests", () => {
        it(`Test 1: should throw errow, when active is not boolean`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.active = "abc")).to.throw(Error);
        });

        it(`Test 2: should throw errow, when active is not boolean`, () => {
            pp = new PaymentPackage("abc", 123);
            expect(() => (pp.active = -1)).to.throw(Error);
        });

        it(`Test 3: should return correct new active`, () => {
            pp = new PaymentPackage("abc", 123);
            expect((pp.active = true)).to.equal(true);
        });
    });

    describe("Tests for toString Method", () => {
        it("Test 1: Should return a string as all the input is correct", () => {
            let flagClass = new PaymentPackage("abc", 123);
            let output = [
                `Package: abc`,
                `- Value (excl. VAT): 123`,
                `- Value (VAT 20%): 147.6`,
            ];
            expect(flagClass.toString()).to.equal(output.join("\n"));
        });

        it("Test 2: Should return a string as all the input is correct", () => {
            let flagClass = new PaymentPackage("abc", 123);
            flagClass.VAT = 30;
            let output = [
                `Package: abc`,
                `- Value (excl. VAT): 123`,
                `- Value (VAT 30%): 159.9`,
            ];
            expect(flagClass.toString()).to.equal(output.join("\n"));
        });

        it("Test 3: Should return a string as all the input is correct", () => {
            let flagClass = new PaymentPackage("abc", 123);
            flagClass.active = false;
            let output = [
                `Package: abc (inactive)`,
                `- Value (excl. VAT): 123`,
                `- Value (VAT 20%): 147.6`,
            ];
            expect(flagClass.toString()).to.equal(output.join("\n"));
        });

        it("Test 4: Should return a string as all the input is correct", () => {
            let flagClass = new PaymentPackage("abc", 123);
            flagClass.VAT = 30;
            flagClass.active = false;
            let output = [
                `Package: abc (inactive)`,
                `- Value (excl. VAT): 123`,
                `- Value (VAT 30%): 159.9`,
            ];
            expect(flagClass.toString()).to.equal(output.join("\n"));
        });
    });
});