function thePyramidOfKingDjoser(base, increment) {
    
    base = Number(base);
    increment = Number(increment);
    let stone = 0;
    let marble = 0;
    let lapisLazuli = 0;
    let gold = 0;
    let pyramidHeight = 0;
    
    while (base >= 1) {
        pyramidHeight++;
        let outerLayer = 0;
        let total = base * base;
        if (base === 2 || base === 1) {
            gold = total;
            break;
        }
        if (pyramidHeight % 5 === 0) {
            outerLayer = 4 * base - 4;
            lapisLazuli += outerLayer;
            stone += total - outerLayer;
        } else {
            outerLayer = 4 * base - 4;
            marble += outerLayer;
            stone += total - outerLayer;
        }
        base -= 2;
    }

    console.log(`Stone required: ${Math.ceil(stone * increment)}`);
    console.log(`Marble required: ${Math.ceil(marble * increment)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapisLazuli * increment)}`);
    console.log(`Gold required: ${Math.ceil(gold * increment)}`);
    console.log(`Final pyramid height: ${Math.floor(pyramidHeight * increment)}`);
}
thePyramidOfKingDjoser(11, 1);
