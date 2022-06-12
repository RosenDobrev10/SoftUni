function clock() {
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m++) {
            for (let s = 0; s < 60; s++) {
                console.log(`${h} : ${m} : ${s}`);
            }
        }
    }
}
clock();
