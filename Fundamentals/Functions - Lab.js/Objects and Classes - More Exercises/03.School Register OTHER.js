function schoolRegister(input) {

	let register = {};                                      // Правим си празен обект, в който ще подреждаме по класове 

	for (let line of input) {                                   // Минаваме по линиите от инпута 
		let tokens = line.split(' ');                           // Разделяме линиите на отделни думи по интервал 
		let studentName = tokens[2].slice(0, tokens[2].length - 1);     // Името е втория индекс, само махаме запетаята 
		let studentGrade = Number(tokens[4].slice(0, tokens[4].length - 1)); // Оценката е 4-ти индекс, само махаме запетаята 
		let averageScore = Number(tokens[tokens.length - 1]);       // Средната оценка е последния елемент 

		if (averageScore >= 3) {                            // Ако оценката е 3 или повече 
			if (!register.hasOwnProperty(studentGrade)) {   // Ако НЯМА такова пропърти с този клас в нашият регистър 
				register[studentGrade] = {                // Създаваме такова пропърти и в него слагаме името и оценката
					name: [studentName],                  
					average: [averageScore],
				};
			} else {                                    // Ако ИМА такова пропърти с този клас в нашият регистър
				register[studentGrade].name.push(studentName);      // Добавяме към името, името на текущия 
				register[studentGrade].average.push(averageScore);  // Добавяме към средния резултат, текущия такъв 
			}
		}
	}

	for (let grade in register) {       // Минаваме с for in цикъл през обектите 
		let student = register[grade]   // Създаваме студент, който е класа от регистъра 
		console.log(`${Number(grade) + 1} Grade`);  // Отпечатваме класа + 1, за да е следващия, в който минават 
		console.log(`List of students: ${student.name.join(', ')}`);    // Отпечатваме имената на студентите в дадения клас, разделени по запетая и интервал 
		let averageNote = student.average.reduce((a,b) => a + b) / student.average.length   // с reduce взимаме всички оценки от настоящия клас и ги делим на броя ученици 
		console.log(`Average annual score from last year: ${averageNote.toFixed(2)}`);  // Печатаме средната оценка до 2-ри знак след дес.запетая
		console.log(" ");       // Печатаме празен ред между класовете 
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