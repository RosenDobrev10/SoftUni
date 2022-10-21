function bonusScoringSystem(arr) {
    let [students, lectures, bonus, ...attendances] = arr.map(Number);
    let maxAttendances = 0;
    let maxBonus = 0;
    for (let i = 0; i < students; i++) {
        let currentBonus = (attendances[i] / lectures) * (5 + bonus);
        if (currentBonus > maxBonus) {
            maxBonus = currentBonus;
            maxAttendances = attendances[i];
        }
    }
    console.log(`Max Bonus: ${Math.ceil(maxBonus)}.`);
    console.log(`The student has attended ${maxAttendances} lectures.`);
}
