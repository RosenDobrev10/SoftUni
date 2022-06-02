function highJump(input) {
    let index = 0;
    let target = Number(input[index++]);
    let height = target - 30;
    let failure = 0;
    let tries = 0;
    while (height <= target) {
        for (i = 1; i <= 3; i++) {
            let attempt = Number(input[index++]);
            tries++;
            if (attempt > height) {
                height += 5;
                attempt = input[index];
                failure = 0;
                break;
            } else {
                failure++;
            }
            if (failure === 3) {
                console.log(`Tihomir failed at ${height}cm after ${tries} jumps.`);
                return;
            }
            attempt = input[index];
        }
    }
    console.log(`Tihomir succeeded, he jumped over ${target}cm after ${tries} jumps.`);
}
highJump(["250", "225", "224", "225", "228", "231", "235", "234", "235"]);
