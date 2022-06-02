function trainTheTrainers(input) {
    let index = 0;
    let people = Number(input[index++]);
    let command = input[index++];
    let sumGrade = 0;
    let counter = 0;

    while (command !== "Finish") {
        let presentation = command;
        let currentGradeSum = 0;
        counter++;
        for (let i = 0; i < people; i++) {
            let grade = Number(input[index++]);
            currentGradeSum += grade;
        }
        let averageGradePresentation = currentGradeSum / people;
        sumGrade += averageGradePresentation;
        console.log(`${presentation} - ${averageGradePresentation.toFixed(2)}.`);
        command = input[index++];
    }
    let average = sumGrade / counter;
    console.log(`Student's final assessment is ${average.toFixed(2)}.`);
}
trainTheTrainers(["2","While-Loop","6.00","5.50","For-Loop","5.84","5.66","Finish",]);
