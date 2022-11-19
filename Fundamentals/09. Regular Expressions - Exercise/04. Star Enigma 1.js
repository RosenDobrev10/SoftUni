function starEnigma(input) {
    const lines = input.shift();
    const attackedPlanets = [];
    const destroyedPlanets = [];
    for (let line of input) {
        const lineLowerCase = line.toLowerCase();
        let key = 0;
        for (let letter of lineLowerCase) {
            letter === "s" || letter === "t" || letter === "a" || letter === "r" ? key++ : null;
        }
        let decryptedMessage = "";
        for (let letter of line) {
            decryptedMessage += String.fromCharCode(letter.charCodeAt() - key);
        }
        const pattern = /[^@\-!:>]*?\@(?<planet>[A-Za-z]+)[^@\-!:>]*?\:(?<population>\d+)[^@\-!:>]*?\!(?<type>[A|D])\![^@\-!:>]*?\-\>(?<soldiers>\d+)[^@\-!:>]*?/g;
        const match = pattern.exec(decryptedMessage);
        if (match) {
            match.groups.type === "A" ? attackedPlanets.push(match.groups.planet) : destroyedPlanets.push(match.groups.planet);
        }
    }
    const sortedAttackedPlanets = attackedPlanets.sort((a, b) => a.localeCompare(b));
    console.log(`Attacked planets: ${sortedAttackedPlanets.length}`);
    sortedAttackedPlanets.forEach((planet) => console.log(`-> ${planet}`));
    const sortedDestroyedPlanets = destroyedPlanets.sort((a, b) => a.localeCompare(b));
    console.log(`Destroyed planets: ${sortedDestroyedPlanets.length}`);
    sortedDestroyedPlanets.forEach((planet) => console.log(`-> ${planet}`));
}
