function bonusScoringSystem(input) {

    input = input.map(Number)           // Минаваме и превръшаме всички стойности в числа 
    let students = input.shift()        // Това са броя на студентите 
    let lectures = input.shift()        // Това са общия брой лекции 
    let additionalBonus = input.shift() // Това е допълнителния бонус 

    let maxAttendance = 0               // Правим променлива, която ще е студента с най-много посещения на лекции 
    let maxBonus = 0                    // Правим променлива да изчислим максималния бонус 

    for (let i = 0; i < students; i++){ // Минаваме по броя лекции на всички студенти 
        let bonus = input[i] / lectures * ( 5 + additionalBonus)    // Изчисляваме бонуса на всеки студент по формулата 
        if (bonus > maxBonus){              // Ако бонуса на текущия студент е по-голям от максималния до момента 
            maxAttendance = input[i]        // Това е студента с най-много посещения на лекции 
            maxBonus = bonus                // Това е и максималния бонус 
        }
    }

    console.log(`Max Bonus: ${Math.ceil(maxBonus)}.`)   // Закръглямаме до по-голямото цяло число 
    console.log(`The student has attended ${maxAttendance} lectures.`)
}
bonusScoringSystem(["5", "25", "30", "12", "19", "24", "16", "20"]);
//bonusScoringSystem(["10", "30", "14", "8", "23", "27", "28", "15", "17", "25", "26", "5", "18"]);
