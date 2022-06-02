function fitnessCenter(input) {
    let index = 0;
    let clients = Number(input[index++]);
    let back = 0;
    let chest = 0;
    let legs = 0;
    let abs = 0;
    let proteinShake = 0;
    let proteinBar = 0;
    let workOut = 0;
    let protein = 0;

    for (let i = 0; i < clients; i++) {
        let nextClient = input[index++];
        if (nextClient === "Back") {
            back++;
            workOut++;
        } else if (nextClient === "Chest") {
            chest++;
            workOut++;
        } else if (nextClient === "Legs") {
            legs++;
            workOut++;
        } else if (nextClient === "Abs") {
            abs++;
            workOut++;
        } else if (nextClient === "Protein shake") {
            proteinShake++;
            protein++;
        } else if (nextClient === "Protein bar") {
            proteinBar++;
            protein++;
        }
    }
    console.log(`${back} - back`);
    console.log(`${chest} - chest`);
    console.log(`${legs} - legs`);
    console.log(`${abs} - abs`);
    console.log(`${proteinShake} - protein shake`);
    console.log(`${proteinBar} - protein bar`);
    console.log(`${((workOut / clients) * 100).toFixed(2)}% - work out`);
    console.log(`${((protein / clients) * 100).toFixed(2)}% - protein `);
}
fitnessCenter(["7","Chest","Back","Legs","Legs","Abs","Protein shake","Protein bar",]);