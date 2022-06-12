function triplesOfLatinLetters(n) {
    let number = Number(n);
    for (let a = 0; a < number; a++) {
        let firstLetter = String.fromCharCode(97 + a);
        for (let b = 0; b < number; b++) {
            let secondLetter = String.fromCharCode(97 + b);
            for (let c = 0; c < number; c++) {
                let thirdletter = String.fromCharCode(97 + c);
                console.log(`${firstLetter}${secondLetter}${thirdletter}`);
            }
        }
    }
}
triplesOfLatinLetters("3");
