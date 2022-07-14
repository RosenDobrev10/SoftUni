function bonusScoringSystem(input) {

    input = input.map(Number)
    let students = input.shift()
    let lectures = input.shift()
    let additionalBonus = input.shift()

    let maxAttendance = 0
    let maxBonus = 0

    for (let i = 0; i < input.length; i++){
        let bonus = input[i] / lectures * ( 5 + additionalBonus)
        if (bonus > maxBonus){
            maxAttendance = input[i]
            maxBonus = bonus
        }
    }

    console.log(`Max Bonus: ${Math.ceil(maxBonus)}.`)
    console.log(`The student has attended ${maxAttendance} lectures.`)
}
bonusScoringSystem(["5", "25", "30", "12", "19", "24", "16", "20"]);
//bonusScoringSystem(["10", "30", "14", "8", "23", "27", "28", "15", "17", "25", "26", "5", "18"]);
