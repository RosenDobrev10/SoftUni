function clock() {
    for (let h = 0; h <= 23; h++) {
        for (let m = 0; m <= 59; m++) {
            console.log(`${h}:${m}`);
        }
    }
}
clock();
