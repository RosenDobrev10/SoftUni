const { expect } = require("chai");
const { movieTheater } = require("./movieTheater");

describe("movieTheater tests", function () {

    describe("ageRestrictions method", function () {

        it("should be correct with movieRating G", function () {
            expect(movieTheater.ageRestrictions('G')).to.equal("All ages admitted to watch the movie");
        });
        it("should be correct with movieRating PG", function () {
            expect(movieTheater.ageRestrictions('PG')).to.equal("Parental guidance suggested! Some material may not be suitable for pre-teenagers");
        });
        it("should be correct with movieRating R", function () {
            expect(movieTheater.ageRestrictions('R')).to.equal("Restricted! Under 17 requires accompanying parent or adult guardian");
        });
        it("should be correct with movieRating NC-17", function () {
            expect(movieTheater.ageRestrictions('NC-17')).to.equal("No one under 17 admitted to watch the movie");
        });
        it("should be correct with movieRating A", function () {
            expect(movieTheater.ageRestrictions('A')).to.equal("There are no age restrictions for this movie");
        });
        it("should be correct with movieRating B", function () {
            expect(movieTheater.ageRestrictions('B')).to.equal("There are no age restrictions for this movie");
        });

    });

    describe("moneySpent method", function () {
        it("should throw Error, when tickets is not number", function () {
            expect(() => movieTheater.moneySpent('a', [], [])).to.throw(Error);
        });
        it("should throw Error, when food is not array", function () {
            expect(() => movieTheater.moneySpent(1, 'a', [])).to.throw(Error);
        });
        it("should throw Error, when drinks is not array", function () {
            expect(() => movieTheater.moneySpent(1, [], 'a')).to.throw(Error);
        });
        it("should be correct with money spend 37.5 with no discount", function () {
            expect(movieTheater.moneySpent(2, ['Nachos'], ['Water'])).to.equal('The total cost for the purchase is 37.50');
        });
        it("should be correct with money spend 50 with no discount", function () {
            expect(movieTheater.moneySpent(2, ['Nachos', 'Nachos'], ['Water', 'Water', 'Soda', 'Soda'])).to.equal('The total cost for the purchase is 50.00');
        });
        it("should be correct with money over 50 with discount", function () {
            expect(movieTheater.moneySpent(3, ['Nachos', 'Nachos'], ['Water', 'Water'])).to.equal('The total cost for the purchase with applied discount is 48.00');
        });

    });

    describe("reservation method", function () {

        it("should throw Error, when rowsArray is not array", function () {
            expect(() => movieTheater.reservation(1, 1)).to.throw(Error);
        });
        it("should throw Error, when neededSeatsCount is not number", function () {
            expect(() => movieTheater.reservation(1, 'a')).to.throw(Error);
        });
        it("should be correct", function () {
            expect(movieTheater.reservation([{ rowNumber: 1, freeSeats: 1 }, { rowNumber: 2, freeSeats: 2 }], 2)).to.equal(2);
        });

    });
});