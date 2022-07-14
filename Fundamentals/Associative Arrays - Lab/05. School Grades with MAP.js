function schoolGrades(input){
    
    let studentsGrades = new Map()  // Създаваме обект от тип МАП 

    for (let element of input) {
        let tokens = element.split(" ")
        let name = tokens.shift()
        let grades = tokens.map(Number)

        if (studentsGrades.has(name) === false){
            studentsGrades.set(name, [])
        }

        let existing = studentsGrades.get(name)
        for (let grade of grades){
            existing.push(grade)
        }
    }
    let sorted = Array.from(studentsGrades)
    sorted.sort((a, b) => a[0].localeCompare(b[0]))

    for (let [name, grades] of sorted){
        let average = 0
        for (let grade of grades){
            average += grade
        }
        average /= grades.length
        console.log(`${name}: ${average.toFixed(2)}`)
    }
}
schoolGrades(['Lilly 4 6 6 5',
'Tim 5 6',
'Tammy 2 4 3',
'Tim 6 6'])

// schoolGrades(['Steven 3 5 6 4',
// 'George 4 6',
// 'Tammy 2 5 3',
// 'Steven 6 3'])