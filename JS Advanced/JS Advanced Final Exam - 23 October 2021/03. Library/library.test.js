const { expect } = require("chai");
const { library } = require("./library");

describe("library tests …", function () {
    describe("calcPriceOfBook method", function () {
        it("should throw error with invalid params", function () {
            expect(() => library.calcPriceOfBook(1, 1)).to.throw(Error);
            expect(() => library.calcPriceOfBook(true, 1)).to.throw(Error);
            expect(() => library.calcPriceOfBook("a", "a")).to.throw(Error);
            expect(() => library.calcPriceOfBook("a", true)).to.throw(Error);
            expect(() => library.calcPriceOfBook("a", 1.1)).to.throw(Error);
            expect(() => library.calcPriceOfBook(1, "a")).to.throw(Error);

            expect(library.calcPriceOfBook("Love", 1981)).to.equal(`Price of Love is 20.00`);
            expect(library.calcPriceOfBook("Love", 1980)).to.equal(`Price of Love is 10.00`);
            expect(library.calcPriceOfBook("Love", 1979)).to.equal(`Price of Love is 10.00`);
        });
    });

    describe("findBook method", function () {
        it("should throw error with invalid params", function () {
            expect(() => library.findBook([], "Love")).to.throw(Error);

            expect(library.findBook(["Hate"], "Love")).to.equal("The book you are looking for is not here!");
            expect(library.findBook(["Love"], "Love")).to.equal("We found the book you want.");
        });
    });

    describe("arrangeTheBooks method", function () {
        it("should throw error with invalid params", function () {
            expect(() => library.arrangeTheBooks(1.1)).to.throw(Error);
            expect(() => library.arrangeTheBooks(true)).to.throw(Error);
            expect(() => library.arrangeTheBooks(-1)).to.throw(Error);

            expect(library.arrangeTheBooks(39)).to.equal("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(40)).to.equal("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(41)).to.equal("Insufficient space, more shelves need to be purchased.");
        });
    });
});
