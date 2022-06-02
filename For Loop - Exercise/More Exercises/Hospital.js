function hospital(input) {
    let index = 0;
    let period = Number(input[index++]);
    let doctors = 7;
    let treated = 0;
    let untreated = 0;

    for (i = 1; i <= period; i++) {
        let patients = Number(input[index++]);
        if (i % 3 === 0) {
            if (untreated > treated) {
                doctors++;
            }
        }
        if (doctors >= patients) {
            treated += patients;
        } else {
            treated += doctors;
            untreated += patients - doctors;
        }
    }
    console.log(`Treated patients: ${treated}.`);
    console.log(`Untreated patients: ${untreated}.`);
}
hospital(["4", "7", "27", "9", "1"]);
