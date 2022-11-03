function schoolRegister(arr) {
    let grades = {}
    for (let line of arr) {
        let tokens = line.split(" ")
        let name = tokens[2].slice(0, -1)
        let grade = Number(tokens[4].slice(0, -1)) + 1
        let averageScore = Number(tokens[tokens.length - 1])
        if (averageScore >= 3) {
            if (grades[grade] === undefined) {
                grades[grade] = { name: [name], averageScore: [averageScore] }
            } else {
                grades[grade].name.push(name)
                grades[grade].averageScore.push(averageScore)
            }
        }
    }

    for (let grade in grades) {
        let average = grades[grade].averageScore.reduce((a, b) => a + b) / grades[grade].averageScore.length
        console.log(`${grade} Grade`)
        console.log(`List of students: ${grades[grade].name.join(", ")}`)
        console.log(`Average annual score from last year: ${average.toFixed(2)}`)
        console.log()
    }
}
