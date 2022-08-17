const { expect } = require("chai");
const { cinema } = require("./JS Advanced Final Retake Exam - 12 August 2021/03. Cinema/cinema");

describe("cinema tests", function () {

    describe("showMovies method", function () {

        it("should return that there is no movies", function () {
            expect(cinema.showMovies([])).to.equal("There are currently no movies to show.");
        });

        it("should return movies", function () {
            expect(cinema.showMovies(["Titanic"])).to.equal("Titanic");
        });

        it("should return movies", function () {
            expect(cinema.showMovies(["Titanic", "Jaws"])).to.equal("Titanic, Jaws");
        });

        it("should return movies", function () {
            expect(cinema.showMovies(["Titanic", "Jaws", "Rush Hour"])).to.equal("Titanic, Jaws, Rush Hour");
        });

    });

    describe("ticketPrice method", function () {

        it("should throw error", function () {
            expect(() => cinema.ticketPrice("Other")).to.throw(Error);
        });

        it("should throw error", function () {
            expect(() => cinema.ticketPrice("a")).to.throw(Error);
        });

        it("should be correct with Premiere", function () {
            expect(cinema.ticketPrice("Premiere")).to.equal(12);
        });

        it("should be correct with Normal", function () {
            expect(cinema.ticketPrice("Normal")).to.equal(7.5);
        });

        it("should be correct with Discount", function () {
            expect(cinema.ticketPrice("Discount")).to.equal(5.5);
        });

    });

    describe("swapSeatsInHall method", function () {

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall("a", 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(true, 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, "a")).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, true)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall("a", "a")).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(true, true)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, 1.1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1.1, 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1.1, 1.1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(2, 2)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(0, 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, 0)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(-1, 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, -1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(-1, -2)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(1, 21)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(21, 1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(21, 22)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(-1, 22)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return unsuccess", function () {
            expect(cinema.swapSeatsInHall(22, -1)).to.equal("Unsuccessful change of seats in the hall.");
        });

        it("should return success", function () {
            expect(cinema.swapSeatsInHall(1, 2)).to.equal("Successful change of seats in the hall.");
        });

        it("should return success", function () {
            expect(cinema.swapSeatsInHall(2, 1)).to.equal("Successful change of seats in the hall.");
        });

        it("should return success", function () {
            expect(cinema.swapSeatsInHall(20, 19)).to.equal("Successful change of seats in the hall.");
        });

        it("should return success", function () {
            expect(cinema.swapSeatsInHall(19, 20)).to.equal("Successful change of seats in the hall.");
        });

    });
});
