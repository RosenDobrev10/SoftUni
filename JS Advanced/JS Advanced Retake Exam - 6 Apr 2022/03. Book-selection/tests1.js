const { expect } = require('chai');
const { bookSelection } = require('./solution');

describe('Test Object', function () {

    describe('Method 1', function () {
        it('Test1', function () {
            expect(bookSelection.isGenreSuitable('Thriller', 11)).equal('Books with Thriller genre are not suitable for kids at 11 age')
            expect(bookSelection.isGenreSuitable('Horror', 11)).equal('Books with Horror genre are not suitable for kids at 11 age')
            expect(bookSelection.isGenreSuitable('Thriller', 12)).equal('Books with Thriller genre are not suitable for kids at 12 age')
            expect(bookSelection.isGenreSuitable('Horror', 12)).equal('Books with Horror genre are not suitable for kids at 12 age')
            expect(bookSelection.isGenreSuitable('Thriller', 13)).equal('Those books are suitable')
            expect(bookSelection.isGenreSuitable('Horror', 13)).equal('Those books are suitable')
            expect(bookSelection.isGenreSuitable('Romantic', 11)).equal('Those books are suitable')
            expect(bookSelection.isGenreSuitable('Romantic', 12)).equal('Those books are suitable')
            expect(bookSelection.isGenreSuitable('Romantic', 13)).equal('Those books are suitable')
        });
    });

    describe('Method 2', function () {
        it('Test 1', function () {
            expect(() => bookSelection.isItAffordable('1', 1)).throw
            expect(() => bookSelection.isItAffordable(1, '1')).throw
            expect(() => bookSelection.isItAffordable('1', '1')).throw
            expect(bookSelection.isItAffordable(1,1)).equal('Book bought. You have 0$ left')
            expect(bookSelection.isItAffordable(1,2)).equal('Book bought. You have 1$ left')
            expect(bookSelection.isItAffordable(2,1)).equal('You don\'t have enough money')
            
        });
    });

    describe('Method 3', function () {
        it('Test 1', function () {
            expect(() => bookSelection.suitableTitles('a', 'a')).throw
            expect(() => bookSelection.suitableTitles(['a'], 1)).throw
            expect(bookSelection.suitableTitles([{genre: 'a', title: 'b'}], 'a')).deep.equal(['b'])
            expect(bookSelection.suitableTitles([{genre: 'a', title: 'b'}], 'c')).deep.equal([])
        });
    });
});
