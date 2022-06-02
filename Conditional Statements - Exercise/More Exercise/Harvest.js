function Harvest(input) {
    let allSquareMeters = Number(input[0]);
    let kilosGrapeFromOneSquareMeter = Number(input[1]);
    let neededLitersWine = Number(input[2]);
    let workers = Number(input[3]);

    let allKilosGrape = allSquareMeters * kilosGrapeFromOneSquareMeter;
    let LitersWine = allKilosGrape / 2.5;
    let finaltLitersWine = LitersWine * 0.4;
    let diff = Math.abs(finaltLitersWine - neededLitersWine);

    if (finaltLitersWine < neededLitersWine) {
        console.log(`It will be a tough winter! More ${Math.floor(diff)} liters wine needed.`);
    } else {
        console.log(`Good harvest this year! Total wine: ${Math.floor(finaltLitersWine)} liters.`);
        let winePerWorker = diff / workers;
        console.log(`${Math.ceil(diff)} liters left -> ${Math.ceil(winePerWorker)} liters per person.`);
    }
}
Harvest(["1020", "1.5", "425", "4"]);
