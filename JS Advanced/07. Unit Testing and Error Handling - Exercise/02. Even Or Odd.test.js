const { expect } = require("chai");                         // Изисквам от библиотеката chai функцията expect 
const { isOddOrEven } = require("./02. Even Or Odd");       // Взимам си функцията isOddOrEven от файла 02. Even Or Odd

describe("Even or Odd Test", () => {                            // Описвам моите тестове
    
    it(`Test 1: return undefined with number param`, () => {   
        expect(isOddOrEven(5)).to.be.undefined;
    });

    it(`Test 2: return undefined with boolean param`, () => {
        expect(isOddOrEven(true)).to.be.undefined;
    });

    it(`Test 3: return undefined with array param`, () => {
        expect(isOddOrEven([1, 2, 3])).to.be.undefined;
    });

    it(`Test 4: return even, when string is with even length`, () => {
        expect(isOddOrEven("love")).to.equal("even");
    });

    it(`Test 5: return odd, when string is with odd length`, () => {
        expect(isOddOrEven("joy")).to.equal("odd");
    });
});
