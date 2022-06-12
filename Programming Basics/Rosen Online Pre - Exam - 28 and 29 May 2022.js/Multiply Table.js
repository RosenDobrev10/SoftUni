function multiplyTable(input) {
    let n = Number(input[0]);
    let a = n % 10;
    let b = Math.floor(n / 10) % 10;
    let c = Math.floor(n / 100) % 10;

    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            for (let k = 1; k <= c; k++) {
                console.log(`${i} * ${j} * ${k} = ${i * j * k};`);
            }
        }
    }
}
multiplyTable(["324"]);
