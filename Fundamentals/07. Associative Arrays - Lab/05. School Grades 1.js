function schoolGrades(arr) {
    let students = {};
    arr.forEach((line) => {
        let [name, ...grades] = line.split(" ");
        grades = grades.map(Number);
        students[name] === undefined ? students[name] = [...grades] : students[name].push(...grades);
    });
    let sorted = Object.entries(students).sort((a, b) => a[0].localeCompare(b[0]));
    for (let [student, grades] of sorted) {
        let averageGrade = grades.reduce((a, b) => a + b) / grades.length;
        console.log(`${student}: ${averageGrade.toFixed(2)}`);
    }
}
