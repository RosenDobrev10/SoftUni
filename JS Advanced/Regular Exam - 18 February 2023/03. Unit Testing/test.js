const { expect } = require('chai');
const findNewApartment = require('./findApartment.js'); 

describe('Object test', function () {

    describe('Method 1', function () {
        it('Test 1', function () {
            expect(() => findNewApartment.isGoodLocation(1, true)).throw();
            expect(() => findNewApartment.isGoodLocation('a', 'a')).throw();
            expect(findNewApartment.isGoodLocation('a', true)).equal("This location is not suitable for you.");
            expect(findNewApartment.isGoodLocation('Sofia', true)).equal("You can go on home tour!");
            expect(findNewApartment.isGoodLocation('Plovdiv', true)).equal("You can go on home tour!");
            expect(findNewApartment.isGoodLocation('Varna', true)).equal("You can go on home tour!");
            expect(findNewApartment.isGoodLocation('Sofia', false)).equal("There is no public transport in area.");
            expect(findNewApartment.isGoodLocation('Plovdiv', false)).equal("There is no public transport in area.");
            expect(findNewApartment.isGoodLocation('Varna', false)).equal("There is no public transport in area.");
        });  
    });

    describe('Method 2', function () {
        it('Test 1', function () {
            expect(() => findNewApartment.isLargeEnough(1, 1)).throw();
            expect(() => findNewApartment.isLargeEnough(['a'], 'a')).throw();
            expect(() => findNewApartment.isLargeEnough([], 1)).throw();
            expect(findNewApartment.isLargeEnough([1], 1)).equal('1');
            expect(findNewApartment.isLargeEnough([1, 2], 1)).equal('1, 2');
            expect(findNewApartment.isLargeEnough([1, 2], 2)).equal('2');
            expect(findNewApartment.isLargeEnough([1, 3], 2)).equal('3');
        });
    });

    describe('Method 3', function () {
        it('Test 1', function () {
            expect(() => findNewApartment.isItAffordable('1', 1)).throw();
            expect(() => findNewApartment.isItAffordable(1, '1')).throw();
            expect(() => findNewApartment.isItAffordable(0, 1)).throw();
            expect(() => findNewApartment.isItAffordable(1, 0)).throw();
            expect(() => findNewApartment.isItAffordable(-1, 1)).throw();
            expect(() => findNewApartment.isItAffordable(1, -1)).throw();
            expect(findNewApartment.isItAffordable(1, 1)).equal("You can afford this home!");
            expect(findNewApartment.isItAffordable(1, 2)).equal("You can afford this home!");
            expect(findNewApartment.isItAffordable(2, 1)).equal("You don't have enough money for this house!");
        });
    });

});
