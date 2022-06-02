function PetShop(input) {
    let dog = 2.5;
    let cat = 4;
    let dogpackage = input[0];
    let catpackage = input[1];
    let sum = dogpackage * dog + catpackage * cat;
    console.log(`${sum} lv.`);
}
PetShop([13, 9]);
