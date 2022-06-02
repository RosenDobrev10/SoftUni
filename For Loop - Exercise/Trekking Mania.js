function trekkingMania(input) {
    index = 0;
    let groups = Number(input[index]);
    index++;

    let musala = 0;
    let montblanc = 0;
    let kilimandjaro = 0;
    let k2 = 0;
    let everest = 0;

    for (i = 0; i < groups; i++) {
        let currentPeople = Number(input[index]);
        index++;
        if (currentPeople <= 5) {
            musala += currentPeople;
        } else if (currentPeople <= 12) {
            montblanc += currentPeople;
        } else if (currentPeople <= 25) {
            kilimandjaro += currentPeople;
        } else if (currentPeople <= 40) {
            k2 += currentPeople;
        } else {
            everest += currentPeople;
        }
    }
    let allPeople = musala + montblanc + kilimandjaro + k2 + everest;
    let p1Musala = (musala / allPeople) * 100;
    let p2Montblanc = (montblanc / allPeople) * 100;
    let p3Kilimandjaro = (kilimandjaro / allPeople) * 100;
    let p4K2 = (k2 / allPeople) * 100;
    let p5Everest = (everest / allPeople) * 100;

    console.log(`${p1Musala.toFixed(2)}%`);
    console.log(`${p2Montblanc.toFixed(2)}%`);
    console.log(`${p3Kilimandjaro.toFixed(2)}%`);
    console.log(`${p4K2.toFixed(2)}%`);
    console.log(`${p5Everest.toFixed(2)}%`);
}
trekkingMania(["5", "25", "41", "31", "250", "6"]);
