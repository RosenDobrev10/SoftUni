function carNumber(input) {
    let startNumber = Number(input[0]);
    let endNumber = Number(input[1]);
    let buff = "";

    for (let a = startNumber; a <= endNumber; a++) {
        for (let b = startNumber; b <= endNumber; b++) {
            for (let c = startNumber; c <= endNumber; c++) {
                for (let d = startNumber; d <= endNumber; d++) {
                    if ((a % 2 === 0 && d % 2 !== 0) || (a % 2 !== 0 && d % 2 === 0)) {
                        if (a > d) {
                            if ((b + c) % 2 === 0) {
                                buff += `${a}${b}${c}${d} `;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(buff);
}
carNumber(["3", "5"]);
