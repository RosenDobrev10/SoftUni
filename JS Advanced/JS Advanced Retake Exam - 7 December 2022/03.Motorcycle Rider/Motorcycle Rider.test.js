const { expect } = require('chai');
const { motorcycleRider } = require('./Motorcycle Rider');

describe("motorcycleRider Tests", function () {

  describe("licenseRestriction method tests ", function () {
    it("should throw Error, when category is invalid", function () {
      expect(() => motorcycleRider.licenseRestriction('B')).to.throw(Error);
    });
    it("should be correct, when category is AM", function () {
      expect(motorcycleRider.licenseRestriction('AM')).to.equal('Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.');
    });
    it("should be correct, when category is A1", function () {
      expect(motorcycleRider.licenseRestriction('A1')).to.equal('Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.');
    });
    it("should be correct, when category is A2", function () {
      expect(motorcycleRider.licenseRestriction('A2')).to.equal('Motorcycles with maximum power of 35KW. and the minimum age is 18.');
    });
    it("should be correct, when category is A", function () {
      expect(motorcycleRider.licenseRestriction('A')).to.equal('No motorcycle restrictions, and the minimum age is 24.');
    });

  });

  describe("motorcycleShowroom method tests ", function () {
    it("should throw Error, when engineVolume is not array", function () {
      expect(() => motorcycleRider.motorcycleShowroom(1, 100)).to.throw(Error);
    });
    it("should throw Error, when engineVolume is not array", function () {
      expect(() => motorcycleRider.motorcycleShowroom([], 100)).to.throw(Error);
    });
    it("should throw Error, when maximumEngineVolume is not number", function () {
      expect(() => motorcycleRider.motorcycleShowroom([100], 'a')).to.throw(Error);
    });
    it("should throw Error, when maximumEngineVolume is not number", function () {
      expect(() => motorcycleRider.motorcycleShowroom([100], 1)).to.throw(Error);
    });
    it("should be correct", function () {
      expect(motorcycleRider.motorcycleShowroom([50], 50)).to.equal(`There are 1 available motorcycles matching your criteria!`);
    });
    it("should be correct", function () {
      expect(motorcycleRider.motorcycleShowroom([99], 100)).to.equal(`There are 1 available motorcycles matching your criteria!`);
    });

  });

  describe("otherSpendings method tests ", function () {
    it("should throw Error, when equipment is not array", function () {
      expect(() => motorcycleRider.otherSpendings(1, [], true)).to.throw(Error);
    });
    it("should throw Error, when consumables is not array", function () {
      expect(() => motorcycleRider.otherSpendings([], 1, true)).to.throw(Error);
    });
    it("should throw Error, when discount is not boolean", function () {
      expect(() => motorcycleRider.otherSpendings([], [], 1)).to.throw(Error);
    });
    it("should be correct with discount", function () {
      expect(motorcycleRider.otherSpendings(['helmet'], ["engine oil"], true)).to.equal(`You spend $243.00 for equipment and consumables with 10% discount!`);
    });
    it("should be correct with no discount", function () {
      expect(motorcycleRider.otherSpendings(['helmet'], ["engine oil"], false)).to.equal(`You spend $270.00 for equipment and consumables!`);
    });
    it("should be correct with no discount", function () {
      expect(motorcycleRider.otherSpendings(['jacked'], ["oil filter"], true)).to.equal(`You spend $297.00 for equipment and consumables with 10% discount!`);
    });
    it("should be correct with no discount", function () {
      expect(motorcycleRider.otherSpendings(['jacked'], ["oil filter"], false)).to.equal(`You spend $330.00 for equipment and consumables!`);
    });
  });

});