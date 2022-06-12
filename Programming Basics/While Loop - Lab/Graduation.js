function graduation(input) {
    let index = 0;
    let name = input[index++];
    let studentclass = 1;
    let excluded = 0;
    let total = 0;

    while (studentclass <= 12) {
        let grade = Number(input[index++]);
        if (grade >= 4) {
            total += grade;
            studentclass++;
        } else {
            excluded++;
            break;
        }
        grade = input[index];
    }
    let averageGrage = total / 12;
    if (excluded >= 1) {
        console.log(`${name} has been excluded at ${studentclass} grade`);
    } else {
        console.log(`${name} graduated. Average grade: ${averageGrage.toFixed(2)}`);
    }
}
graduation(["Gosho","5","5.5","6","5.43","5.5","6","5.55","5","6","6","5.43","5",]);
