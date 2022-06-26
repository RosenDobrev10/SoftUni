function schoolRegister(input){

    let thisYearStudents = []

    for (let element of input){
        let info = element.split("Student name: ")
        let studentName = info[1].split(",").shift()
        let a = info.join(" ")
        let b = a.split("Grade: ")
        let c = b[1].split(",")
        let grade = Number(c[0])
        let d = c[1].split("Graduated with an average score: ")
        let averageScoreStudent = Number(d[1])
        let object = {studentName, grade, averageScoreStudent}
        thisYearStudents.push(object)
    }
    let newYearStudents = []
    for (let student of thisYearStudents){
        if (student.averageScoreStudent >= 3){
            student.grade++
            newYearStudents.push(student)
        }
    }

    newYearStudents.sort((a, b) => a.grade - b.grade)

    let currentGrade = 0
    let people = 0
    let averageSum = 0
    let peopleInClass = []

    for (let currentStudent of newYearStudents){
        if (currentStudent.grade === currentGrade){
            people++
            averageSum += currentStudent.averageScoreStudent
            peopleInClass.push(currentStudent.studentName)
            let averageScore = averageSum / people
            console.log(`List of students: ${peopleInClass.join(", ")}`)
            console.log(`Average annual score from last year: ${averageScore.toFixed(2)}`)
            console.log("")
        }
        else {
            peopleInClass = []
            people = 0
            averageSum = 0
            people++
            averageSum += currentStudent.averageScoreStudent
            peopleInClass.push(currentStudent.studentName)
            currentGrade = currentStudent.grade
            console.log(`${currentGrade} Grade`)
        }
    }

}
schoolRegister([
"Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
"Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",   
"Student name: George, Grade: 8, Graduated with an average score: 2.83",   
"Student name: Steven, Grade: 10, Graduated with an average score: 4.20",   
"Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
"Student name: Angus, Grade: 11, Graduated with an average score: 2.90", 
"Student name: Bob, Grade: 11, Graduated with an average score: 5.15", 
"Student name: Daryl, Grade: 8, Graduated with an average score: 5.95", 
"Student name: Bill, Grade: 9, Graduated with an average score: 6.00", 
"Student name: Philip, Grade: 10, Graduated with an average score: 5.05", 
"Student name: Peter, Grade: 11, Graduated with an average score: 4.88", 
"Student name: Gavin, Grade: 10, Graduated with an average score: 4.00" 
])