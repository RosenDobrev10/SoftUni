function schoolGrades(input){
    
    let studentsGrades = {}  // Създаваме обект 

    for (let element of input) {            // Минаваме елементите от инпута 
        let tokens = element.split(" ")     // Взимаме токена                                                                                                                                                                                                                               
        let name = tokens.shift()           // Първия елемент от токена е името на ученика 
        let grades = tokens.map(Number)     // Останалата част са оценките, правим ги на числа 

        if (!studentsGrades.hasOwnProperty(name)){  // Ако няма такъв ученик 
            studentsGrades[name] = []               // го създаваме като оценките са празен масив 
        }

        let existing = studentsGrades[name]         // Взимаме оценките на ученика 
        grades.map(x => existing.push(x))           // оценките ги добавяме към съществуващите вече 
        
    }
    let sorted = Object.entries(studentsGrades)     // Взимаме студентите и техните оценки от обекта 
    sorted.sort((a, b) => a[0].localeCompare(b[0])) // Сортиране по имената на студентите 

    for (let [name, grades] of sorted){         // Взимаме имената и оценките на студентите от сортирания масив 
        let average = 0                         // Слагаме средната оценка да е 0 
        grades.map(x => average += x)           // добавяме оценките към една променлива 
        average /= grades.length                // делим всички оценки на броя оценки 
        console.log(`${name}: ${average.toFixed(2)}`)   // Печатаме имената и средната оценка 
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