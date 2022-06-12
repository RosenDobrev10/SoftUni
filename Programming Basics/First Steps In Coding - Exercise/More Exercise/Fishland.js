function fishland(input) {
    let skumriaPrice = Number(input[0]);
    let cacaPrice = Number(input[1]);
    let kiloPalamud = Number(input[2]);
    let kiloSafrid = Number(input[3]);
    let kiloMidi = Number(input[4]);

    let palamudPrice = skumriaPrice * 1.6;
    let finalPalamudPrice = palamudPrice * kiloPalamud;
    let safridPrice = cacaPrice * 1.8;
    let finalsafridPrice = safridPrice * kiloSafrid;
    let finalMidiPrice = 7.5 * kiloMidi;
    let allSum = finalMidiPrice + finalsafridPrice + finalPalamudPrice;
    console.log(allSum.toFixed(2));
}
fishland(["6.9", "4.2", "1.5", "2.5", "1"]);
