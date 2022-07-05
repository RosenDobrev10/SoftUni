function footballLeague(input) {
    let index = 0;
    let capacity = Number(input[index++]);
    let fans = Number(input[index++]);
    let A = 0;
    let B = 0;
    let V = 0;
    let G = 0;
    let percentFans = (fans / capacity) * 100;
    for (let i = 0; i < fans; i++) {
        let currentFan = input[index++];
        switch (currentFan) {
            case "A": A++; break;
            case "B": B++; break;
            case "V": V++; break;
            case "G": G++; break;
        }
    }
    console.log(`${((A / fans) * 100).toFixed(2)}%`);
    console.log(`${((B / fans) * 100).toFixed(2)}%`);
    console.log(`${((V / fans) * 100).toFixed(2)}%`);
    console.log(`${((G / fans) * 100).toFixed(2)}%`);
    console.log(`${percentFans.toFixed(2)}%`);
}
footballLeague(["76", "10", "A", "V", "V", "V", "G", "B", "A", "V", "B", "B"]);
