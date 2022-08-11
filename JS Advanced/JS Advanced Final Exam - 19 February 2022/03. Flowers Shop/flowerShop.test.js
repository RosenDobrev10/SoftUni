const { expect } = require("chai");
const { flowerShop } = require("./flowerShop");

describe("flowerShop tests", function () {

    describe("calcPriceOfFlowers", function () {
        it("should throw error", function () {
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, 1)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers(true, 1, 1)).to.throw(Error);

            expect(() => flowerShop.calcPriceOfFlowers("Rose", "Rose", 1)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers("Rose", true, 1)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers("Rose", 1.1, 1)).to.throw(Error);

            expect(() => flowerShop.calcPriceOfFlowers("Rose", 1, "Rose")).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers("Rose", 1, true)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers("Rose", 1, 1.1)).to.throw(Error);

            expect(() => flowerShop.calcPriceOfFlowers(1, true, 1)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, true)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers("Rose", true, true)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, true)).to.throw(Error);
            expect(() => flowerShop.calcPriceOfFlowers(true, true, 1)).to.throw(Error);

            expect(flowerShop.calcPriceOfFlowers("Rose", 1, 1)).to.equal(`You need $1.00 to buy Rose!`);
            expect(flowerShop.calcPriceOfFlowers("Rose", 1, 2)).to.equal(`You need $2.00 to buy Rose!`);
        });
    });

    describe("checkFlowersAvailable", function () {
        it("should throw error", function () {
            expect(flowerShop.checkFlowersAvailable("Rose", ["Rose", "Tulip"])).to.equal(`The Rose are available!`);
            expect(flowerShop.checkFlowersAvailable("Rose", ["Tulip", "Rose"])).to.equal(`The Rose are available!`);

            expect(flowerShop.checkFlowersAvailable("Orchid", ["Tulip", "Rose"])).to.equal(`The Orchid are sold! You need to purchase more!`);
        });
    });

    describe("sellFlowers", function () {
        it("should throw error", function () {
            expect(() => flowerShop.sellFlowers(["Rose", "Tulip"], true)).to.throw(Error);
            expect(() => flowerShop.sellFlowers(["Rose", "Tulip"], 1.1)).to.throw(Error);

            expect(() => flowerShop.sellFlowers(true, 1)).to.throw(Error);
            expect(() => flowerShop.sellFlowers("abc", 1)).to.throw(Error);

            expect(() => flowerShop.sellFlowers(["Rose", "Tulip"], -1)).to.throw(Error);
            expect(() => flowerShop.sellFlowers(["Rose", "Tulip"], 2)).to.throw(Error);
            expect(() => flowerShop.sellFlowers(["Rose", "Tulip"], 3)).to.throw(Error);

            expect(flowerShop.sellFlowers(["Rose", "Tulip"], 1)).to.equal("Rose");
            expect(flowerShop.sellFlowers(["Rose", "Tulip"], 0)).to.equal("Tulip");

            expect(flowerShop.sellFlowers(["Rose", "Tulip", "Orchid"], 1)).to.equal("Rose / Orchid");
            expect(flowerShop.sellFlowers(["Rose", "Tulip", "Orchid"], 0)).to.equal("Tulip / Orchid");
            expect(flowerShop.sellFlowers(["Rose", "Tulip", "Orchid"], 2)).to.equal("Rose / Tulip");
        });
    });
});
