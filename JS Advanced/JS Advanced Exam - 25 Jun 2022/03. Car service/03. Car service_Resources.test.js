const { expect } = require('chai');
const { carService } = require('./03. Car service_Resources')

describe("Car Service Tests …", function() {

    describe("isItExpensive method", function() {

        it("Problem is Engine", function() {
            expect(carService.isItExpensive('Engine')).to.equal(`The issue with the car is more severe and it will cost more money`)
        });

        it("Problem is Transmission", function() {
            expect(carService.isItExpensive('Transmission')).to.equal(`The issue with the car is more severe and it will cost more money`)
        });

        it("Problem is Brakes", function() {
            expect(carService.isItExpensive('Brakes')).to.equal(`The overall price will be a bit cheaper`)
        });
     });

     describe("discount method", function() {

        it("error with numberofparts is not number", function() {
            expect(() => carService.discount('a', 1)).to.throw
        });

        it("error with numberofparts is not number", function() {
            expect(() => carService.discount(true, 1)).to.throw
        });

        it("error with totalPrice is not number", function() {
            expect(() => carService.discount(1, 'a')).to.throw
        });

        it("error with totalPrice is not number", function() {
            expect(() => carService.discount(1, true)).to.throw
        });

        it("error with both invalid params", function() {
            expect(() => carService.discount('a', 'b')).to.throw
        });

        it("when numberofparts is 2", function() {
            expect(carService.discount(2, 1)).to.equal("You cannot apply a discount")
        });

        it("when numberofparts is 0", function() {
            expect(carService.discount(0, 1)).to.equal("You cannot apply a discount")
        });

        it("when numberofparts is -1", function() {
            expect(carService.discount(-1, 1)).to.equal("You cannot apply a discount")
        });

        it("when numberofparts is less than 2", function() {
            expect(carService.discount(1, 1)).to.equal("You cannot apply a discount")
        });

        it("when numberofparts is 7", function() {
            expect(carService.discount(7, 1)).to.equal(`Discount applied! You saved 0.15$`)
        });

        it("when numberofparts is 6", function() {
            expect(carService.discount(6, 1)).to.equal(`Discount applied! You saved 0.15$`)
        });

        it("when numberofparts is 8", function() {
            expect(carService.discount(8, 1)).to.equal(`Discount applied! You saved 0.3$`)
        });

        it("when numberofparts is 8", function() {
            expect(carService.discount(8, 2)).to.equal(`Discount applied! You saved 0.6$`)
        });

     });

     describe("partsToBuy method", function() {

        it("when both are invalid", function() {
            expect(() => carService.partsToBuy(1, 1)).to.throw
        });

        it("when one is invalid", function() {
            expect(() => carService.partsToBuy(1, ['mirror'])).to.throw
        });

        it("when one is invalid", function() {
            expect(() => carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], 1)).to.throw
        });

        it("when partsCatalog is empty", function() {
            expect(carService.partsToBuy([], ['mirror'])).to.equal(0)
        });

        it("when one is invalid", function() {
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }], ['blowoff valve'])).to.equal(145)
        });

       
     });

});