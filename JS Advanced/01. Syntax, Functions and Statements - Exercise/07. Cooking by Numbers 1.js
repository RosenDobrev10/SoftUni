function cookingByNumbers(number, ...commands) {
    number = Number(number);
    const operations = {
        chop() { number = number / 2;},
        dice() { number = Math.sqrt(number);},
        spice() { number++;},
        bake() { number *= 3;},
        fillet() { number *= 0.8;},
    };
    for (const command of commands) {
        operations[command]();
        console.log(number); 
    }
}
