const { expect } = require("chai"); // Изисквам от библиотеката chai функцията expect
const { lookupChar } = require("./03. Char Lookup");

describe(`Char Lookup Tests`, () => {
    
    it(`Test 1: return undefined, when index param is floating-point number`, () => {
        expect(lookupChar("love", 2.2)).to.be.undefined;
    });

    it(`Test 2: return undefined, when string param is not string`, () => {
        expect(lookupChar(["love"], 2)).to.be.undefined;
    });

    it(`Test 3: return undefined, index param is not number`, () => {
        expect(lookupChar("love", true)).to.be.undefined;
    });

    it(`Test 4: return undefined, when both params are invalid`, () => {
        expect(lookupChar(["love"], true)).to.be.undefined;
    });

    it(`Test 5: return "Incorrect index", when index is a negative number`, () => {
        expect(lookupChar("love", -1)).to.equal("Incorrect index");
    });

    it(`Test 6: return "Incorrect index", when index is bigger than or equal to the string length`, () => {
        expect(lookupChar("love", 4)).to.equal("Incorrect index");
        expect(lookupChar("love", 5)).to.equal("Incorrect index");
    });

    it(`Test 7: return "v", when index is 2 and string is love`, () => {
        expect(lookupChar("love", 2)).to.equal("v");
    });
});
