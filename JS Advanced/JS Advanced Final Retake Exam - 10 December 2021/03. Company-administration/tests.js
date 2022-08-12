const { expect } = require('chai')
const { companyAdministration } = require('./companyAdministration')

describe("companyAdministration tests", () => {

    describe("hiringEmployee method", () => {

        it(`should throw error, when position is not Programmer`, () => {
            expect(() => companyAdministration.hiringEmployee('Dave', 'Worker', 3)).to.throw(Error)
        })

        it(`should throw error, when position is not Programmer`, () => {
            expect(() => companyAdministration.hiringEmployee('Dave', 'Doctor', 3)).to.throw(Error)
        })

        it(`should return not hired`, () => {
            expect(companyAdministration.hiringEmployee('Dave', 'Programmer',-1)).to.equal(`Dave is not approved for this position.`)
        })

        it(`should return not hired`, () => {
            expect(companyAdministration.hiringEmployee('Dave', 'Programmer', 0)).to.equal(`Dave is not approved for this position.`)
        })

        it(`should return not hired`, () => {
            expect(companyAdministration.hiringEmployee('Dave', 'Programmer', 2)).to.equal(`Dave is not approved for this position.`)
        })

        it(`should return hired, when yearsExperience is exactly 3`, () => {
            expect(companyAdministration.hiringEmployee('Dave', 'Programmer', 3)).to.equal(`Dave was successfully hired for the position Programmer.`)
        })

        it(`should return hired, when yearsExperience is greater than 3 `, () => {
            expect(companyAdministration.hiringEmployee('Dave', 'Programmer', 4)).to.equal(`Dave was successfully hired for the position Programmer.`)
        })

    })

    describe("calculateSalary method", () => {

        it(`should throw error, when hours is not number`, () => {
            expect(() => companyAdministration.calculateSalary('abc')).to.throw(Error)
        })

        it(`should throw error, when hours is not number`, () => {
            expect(() => companyAdministration.calculateSalary(true)).to.throw(Error)
        })

        it(`should throw error, when hours is negative number`, () => {
            expect(() => companyAdministration.calculateSalary(-1)).to.throw(Error)
        })

        it(`should throw error, when hours is negative number`, () => {
            expect(() => companyAdministration.calculateSalary('-1')).to.throw(Error)
        })


        it(`should return 0, when hours is 0`, () => {
            expect(companyAdministration.calculateSalary(0)).to.equal(0)
        })

        it(`should return 15, when hours is 1`, () => {
            expect(companyAdministration.calculateSalary(1)).to.equal(15)
        })

        it(`should return 15, when hours is 160`, () => {
            expect(companyAdministration.calculateSalary(160)).to.equal(2400)
        })

        it(`should return 3415, when hours is 161`, () => {
            expect(companyAdministration.calculateSalary(161)).to.equal(3415)
        })

    })

    describe("firedEmployee method", () => {

        it(`should throw error, when employees is not array`, () => {
            expect(() => companyAdministration.firedEmployee('abc', 1)).to.throw(Error)
        })

        it(`should throw error, when employees is not array`, () => {
            expect(() => companyAdministration.firedEmployee(true, 1)).to.throw(Error)
        })

        it(`should throw error, when index is not number`, () => {
            expect(() => companyAdministration.firedEmployee(['Dave', 'Bob'], 'abc')).to.throw(Error)
        })

        it(`should throw error, when index is not number`, () => {
            expect(() => companyAdministration.firedEmployee(['Dave', 'Bob'], true)).to.throw(Error)
        })

        it(`should throw error, when index is negative number`, () => {
            expect(() => companyAdministration.firedEmployee(['Dave', 'Bob'], -1)).to.throw(Error)
        })

        it(`should throw error, when index is equal to array.length`, () => {
            expect(() => companyAdministration.firedEmployee(['Dave', 'Bob'], 2)).to.throw(Error)
        })

        it(`should throw error, when index is greater than array.length`, () => {
            expect(() => companyAdministration.firedEmployee(['Dave', 'Bob'], 3)).to.throw(Error)
        })

        it(`should throw error, when index is not integer`, () => {
            expect(() => companyAdministration.firedEmployee(['Dave', 'Bob'], 3.14)).to.throw(Error)
        })

        it(`should throw error, when both params are invalid`, () => {
            expect(() => companyAdministration.firedEmployee(1, 3)).to.throw(Error)
        })

        it(`should throw error, when both params are invalid`, () => {
            expect(() => companyAdministration.firedEmployee([], 3)).to.throw(Error)
        })

        it(`should return correct result, when params are valid 1`, () => {
            expect(companyAdministration.firedEmployee(['Dave', 'Bob'], 1)).to.equal('Dave')
        })

        it(`should return correct result, when params are valid 2`, () => {
            expect(companyAdministration.firedEmployee(['Dave', 'Bob'], 0)).to.equal("Bob")
        })

        it(`should return correct result, when params are valid 3`, () => {
            expect(companyAdministration.firedEmployee(['Dave', 'Bob', 'Kevin'], 0)).to.equal('Bob, Kevin')
        })

        it(`should return correct result, when params are valid 4`, () => {
            expect(companyAdministration.firedEmployee(['Dave', 'Bob', 'Kevin'], 1)).to.deep.equal("Dave, Kevin")
        })

        it(`should return correct result, when params are valid 5`, () => {
            expect(companyAdministration.firedEmployee(['Dave', 'Bob', 'Kevin'], 2)).to.equal("Dave, Bob")
        })

    })
})
