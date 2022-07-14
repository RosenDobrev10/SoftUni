function formatGrade(grade) {

    let formatted = grade.toFixed(2);
    let description = "";

    if (grade < 3.0) {
        formatted = "2";
        description = "Fail";
    } else if (grade < 3.5) {
        description = "Poor";
    } else if (grade < 4.5) {
        description = "Good";
    } else if (grade < 5.5) {
        description = "Very good";
    } else {
        description = "Excellent";
    }
    console.log(`${description} (${formatted})`);
}
formatGrade(3.33);
formatGrade(4.5);
formatGrade(2.99);
