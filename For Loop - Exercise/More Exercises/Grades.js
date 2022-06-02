function grades(input) {
    let index = 0;
    let students = Number(input[index++]);
    let weak = 0;
    let good = 0;
    let veryGood = 0;
    let excellent = 0;
    let sumGrades = 0;

    for (let i = 0; i < students; i++) {
        let currentGrade = Number(input[index++]);
        sumGrades += currentGrade;
        if (currentGrade < 3) {
            weak++;
        } else if (currentGrade < 4) {
            good++;
        } else if (currentGrade < 5) {
            veryGood++;
        } else {
            excellent++;
        }
    }
    console.log(`Top students: ${((excellent / students) * 100).toFixed(2)}%`);
    console.log(`Between 4.00 and 4.99: ${((veryGood / students) * 100).toFixed(2)}%`);
    console.log(`Between 3.00 and 3.99: ${((good / students) * 100).toFixed(2)}%`);
    console.log(`Fail: ${((weak / students) * 100).toFixed(2)}%`);
    console.log(`Average: ${(sumGrades / students).toFixed(2)}`);
}
grades(["10","3.00","2.99","5.68","3.01","4","4","6.00","4.50","2.44","5",]);
