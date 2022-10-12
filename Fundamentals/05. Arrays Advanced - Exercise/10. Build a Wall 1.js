function buildAWall(array) {
    let result = [];
    while (array.length > 0) {
        let start = Math.max(...array);
        for (let i = start; i < 30; i++) {
            for (let j = 0; j < array.length; j++) {
                array[j]++;
            }
            result.push(array.length * 195);
        }
        array = array.filter(el => el !== 30)
    }
    console.log(`${result.join(", ")}\n${result.reduce((a, b) => a + b, 0) * 1900} pesos`);
}
