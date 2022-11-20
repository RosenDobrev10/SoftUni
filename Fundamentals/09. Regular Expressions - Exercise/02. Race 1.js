function race(input) {
    const racers = input.shift().split(", ");
    const racersObj = {};
    while (input[0] !== "end of race") {
        const line = input.shift();
        const name = line.match(/[A-Za-z]+/g).join("");
        if (racers.includes(name)) {
            const km = line.match(/\d/g).map(Number).reduce((a, b) => a + b, 0);
            racersObj[name] === undefined ? racersObj[name] = 0 : null;
            racersObj[name] += km;
        }
    }
    const sorted = Object.keys(racersObj).sort((a, b) => racersObj[b] - racersObj[a]);
    console.log(`1st place: ${sorted[0]}`);
    console.log(`2nd place: ${sorted[1]}`);
    console.log(`3rd place: ${sorted[2]}`);
}
