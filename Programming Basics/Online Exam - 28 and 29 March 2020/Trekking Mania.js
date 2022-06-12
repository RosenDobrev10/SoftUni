function trekkingMania(input) {
    let index = 0;
    let groups = Number(input[index++]);
    let musala = 0;
    let montblanc = 0;
    let kilimanjaro = 0;
    let k2 = 0;
    let everest = 0;
    let allPeople = 0;

    for (let i = 0; i < groups; i++) {
        let currentGroup = Number(input[index++]);
        allPeople += currentGroup;
        if (currentGroup <= 5) {
            musala += currentGroup;
        } else if (currentGroup >= 6 && currentGroup <= 12) {
            montblanc += currentGroup;
        } else if (currentGroup >= 13 && currentGroup <= 25) {
            kilimanjaro += currentGroup;
        } else if (currentGroup >= 26 && currentGroup <= 40) {
            k2 += currentGroup;
        } else {
            everest += currentGroup;
        }
    }
    let pmusala = (musala / allPeople) * 100;
    let pmontlanc = (montblanc / allPeople) * 100;
    let pkilimanjaro = (kilimanjaro / allPeople) * 100;
    let pk2 = (k2 / allPeople) * 100;
    let peverest = (everest / allPeople) * 100;
    console.log(`${pmusala.toFixed(2)}%`);
    console.log(`${pmontlanc.toFixed(2)}%`);
    console.log(`${pkilimanjaro.toFixed(2)}%`);
    console.log(`${pk2.toFixed(2)}%`);
    console.log(`${peverest.toFixed(2)}%`);
}
trekkingMania(["10","10","5","1","100","12","26","17","37","40","78",]);
