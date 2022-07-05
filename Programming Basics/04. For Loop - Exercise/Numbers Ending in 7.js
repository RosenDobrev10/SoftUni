function numbersEndingIn7(input) {
    for (let i = 1; i <= 1000; i++) {
        if (i % 10 === 7) {
            console.log(i);
        }
    }
}
numbersEndingIn7();
