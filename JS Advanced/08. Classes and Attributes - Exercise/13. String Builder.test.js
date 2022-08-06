const { expect } = require("chai");
const StringBuilder = require("./13. String Builder");

describe("String Builder test", () => {
    
    describe("constructor test", () => {
        it(`Test 1: should initialize with empty array if undefined is passed`, () => {
            let sb = new StringBuilder(undefined);
            expect(sb.toString()).to.equal("");
        });

        it(`Test 2: should throw error, if passed a non-string argument`, () => {
            expect(() => new StringBuilder(1.23)).to.throw(TypeError);
            expect(() => new StringBuilder(null)).to.throw(TypeError);
        });

        it(`Test 3: should initialize correct array, when passed a valid string`, () => {
            let sb1 = new StringBuilder("abc");
            let sb2 = new StringBuilder("test");
            expect(sb1.toString()).to.equal("abc");
            expect(sb2.toString()).to.equal("test");
        });
    });

    describe("append test", () => {
        it(`Test 1: should throw error, when passed a non-string argument`, () => {
            let sb = new StringBuilder();
            expect(() => sb.append(true)).to.throw(TypeError);
            let sb2 = new StringBuilder("abc");
            expect(() => sb2.append(123)).to.throw(TypeError);
        });

        it(`Test 2: should append string correctly, when passed a string argument`, () => {
            let input = "123";
            let input2 = "wow";
            let expected = "abc123";
            let expected2 = "abc123wow";
            let sb = new StringBuilder("abc");
            sb.append(input);
            expect(sb.toString()).to.equal(expected);
            sb.append(input2);
            expect(sb.toString()).to.equal(expected2);
        });

        it(`Test 3: should append only the string chars, when passed a string argument`, () => {
            let input = "123";
            let input2 = "wow";
            let expected = "abc123";
            let expected2 = "abc123wow";
            let expected3 = "abc123ww";
            let sb = new StringBuilder("abc");
            sb.append(input);
            expect(sb.toString()).to.equal(expected);
            sb.append(input2);
            expect(sb.toString()).to.equal(expected2);
            sb.remove(7, 1);
            expect(sb.toString()).to.equal(expected3);
        });
    });

    describe("prepend test", () => {
        it(`Test 1: should throw error, when passed a non-string argument`, () => {
            let sb = new StringBuilder();
            expect(() => sb.prepend(true)).to.throw(TypeError);
            let sb2 = new StringBuilder("abc");
            expect(() => sb2.prepend(123)).to.throw(TypeError);
        });

        it(`Test 2: should prepend string correctly, when passed a string argument`, () => {
            let input = "123";
            let input2 = "wow";
            let expected = "123abc";
            let expected2 = "wow123abc";
            let sb = new StringBuilder("abc");
            sb.prepend(input);
            expect(sb.toString()).to.equal(expected);
            sb.prepend(input2);
            expect(sb.toString()).to.equal(expected2);
        });

        it(`Test 3: should prepend chars at correct index correctly, when passed a string argument`, () => {
            let input = "123";
            let input2 = "wow";
            let expected = "123abc";
            let expected2 = "wow123abc";
            let expected3 = "wow123bc";
            let sb = new StringBuilder("abc");
            sb.prepend(input);
            expect(sb.toString()).to.equal(expected);
            sb.prepend(input2);
            expect(sb.toString()).to.equal(expected2);
            sb.remove(6, 1);
            expect(sb.toString()).to.equal(expected3);
        });
    });

    describe("insertAt test", () => {
        it(`Test 1: should throw error, when passed a non-string argument`, () => {
            let sb = new StringBuilder();
            expect(() => sb.insertAt(true, 0)).to.throw(TypeError);
            let sb2 = new StringBuilder("abc");
            expect(() => sb2.insertAt(123, 0)).to.throw(TypeError);
        });

        it(`Test 2: should insert chars at correct index, when passed a valid string`, () => {
            let input = " fast";
            let input2 = " are";
            let expected = "cars fast";
            let expected2 = "cars are fast";
            let sb = new StringBuilder("cars");
            sb.insertAt(input, 4);
            expect(sb.toString()).to.equal(expected);
            sb.insertAt(input2, 4);
            expect(sb.toString()).to.equal(expected2);
        });

        it(`Test 3: should insert chars at correct index, when passed a valid string`, () => {
            let input = " fast";
            let input2 = " are";
            let expected = "cars fast";
            let expected2 = "cars are fast";
            let expected3 = "cars are fat";
            let sb = new StringBuilder("cars");
            sb.insertAt(input, 4);
            expect(sb.toString()).to.equal(expected);
            sb.insertAt(input2, 4);
            expect(sb.toString()).to.equal(expected2);
            sb.remove(11, 1);
            expect(sb.toString()).to.equal(expected3);
        });
    });

    describe("remove test", () => {
        it(`Test 1: should remove chars at correct index`, () => {
            let expected = "cars are fat";
            let expected2 = "cars fat";
            let sb = new StringBuilder("cars are fast");
            sb.remove(11, 1);
            expect(sb.toString()).to.equal(expected);
            sb.remove(4, 4);
            expect(sb.toString()).to.equal(expected2);
        });
    });

    describe("toString test", () => {
        it(`Test 1: should return correct string representation internal array, when called `, () => {
            let expected = "";
            let expected2 = "cars are fast";
            let sb = new StringBuilder();
            let sb2 = new StringBuilder("cars are fast");
            expect(sb.toString()).to.equal(expected);
            expect(sb2.toString()).to.equal(expected2);
        });
    });
});
