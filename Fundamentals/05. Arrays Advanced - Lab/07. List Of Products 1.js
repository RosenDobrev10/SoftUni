function listOfProducts(array) {
    array.sort().forEach((el, i) => console.log(`${i + 1}.${el}`));
}
