const { expect } = require("chai");
const { bookSelection } = require("./solution");

describe(`Book selection tests`, () => {

  describe(`isGenreSuitable method`, () => {

    it(`Suitable books adult`, () => {
      expect(bookSelection.isGenreSuitable("Comedy", 20)).to.equal(`Those books are suitable`);
    });

    it(`Suitable books for underage`, () => {
      expect(bookSelection.isGenreSuitable("Comedy", 10)).to.equal(`Those books are suitable`);
    });

    it(`Thriller book for adults`, () => {
      expect(bookSelection.isGenreSuitable("Thriller", 20)).to.equal(`Those books are suitable`);
    });

    it(`Horror book for adults`, () => {
      expect(bookSelection.isGenreSuitable("Horror", 20)).to.equal(`Those books are suitable`);
    });

    it(`Horror book for exactly 12`, () => {
      expect(bookSelection.isGenreSuitable("Horror", 12)).to.equal(`Books with Horror genre are not suitable for kids at 12 age`);
    });

    it(`Horror book for under 12`, () => {
      expect(bookSelection.isGenreSuitable("Horror", 11)).to.equal(`Books with Horror genre are not suitable for kids at 11 age`);
    });

    it(`Thriller book for exactly 12`, () => {
      expect(bookSelection.isGenreSuitable("Thriller", 12)).to.equal(`Books with Thriller genre are not suitable for kids at 12 age`);
    });

    it(`Thriller book for under 12`, () => {
      expect(bookSelection.isGenreSuitable("Thriller", 11)).to.equal(`Books with Thriller genre are not suitable for kids at 11 age`);
    });
  });

  describe(`isItAffordable method`, () => {

    it(`price is not number`, () => {     // КОГАТО ПРОВЕРЯВАМЕ ЗА ГРЕШКА ТРЯБВА ДА ИМА () => Преди обекта с метода !!!!!!!!!!!
      expect(() => bookSelection.isItAffordable("abc", 1)).to.throw(Error);
    });

    it(`budget is not number`, () => {
      expect(() => bookSelection.isItAffordable(1, "abc")).to.throw(Error);
    });

    it(`budget is bigger than price`, () => {
      expect(bookSelection.isItAffordable(1, 2)).to.equal(`Book bought. You have 1$ left`);
    });

    it(`budget is smaller than price`, () => {
      expect(bookSelection.isItAffordable(2, 1)).to.equal(`You don't have enough money`);
    });

    it(`budget is equal to price`, () => {
      expect(bookSelection.isItAffordable(1, 1)).to.equal(`Book bought. You have 0$ left`);
    });
  });

  describe(`suitableTitles method`, () => {
    it(`array is not array`, () => {
      expect(() => bookSelection.suitableTitles(1, "abc")).to.throw(Error);
    });

    it(`wantedGenre is not string`, () => {
      expect(() => bookSelection.suitableTitles([1, 2, 3], 1)).to.throw(Error);
    });

    it(`works correct with 1 match`, () => {  // КОГАТО СЕ СРАВНЯВАТ МАСИВИ ТРЯБВА DEEP ДА СЕ СЛОЖИ ПРЕД EQUAL !!!!!!!!!!!!
      let obj1 = { title: "a", genre: "aa" };
      expect(bookSelection.suitableTitles([obj1], "aa")).to.deep.equal(["a"]);
    });

    it(`works correct with no match`, () => {
      let obj1 = { title: "a", genre: "aa" };
      expect(bookSelection.suitableTitles([obj1], "aaa")).to.deep.equal([]);
    });
  });
});
