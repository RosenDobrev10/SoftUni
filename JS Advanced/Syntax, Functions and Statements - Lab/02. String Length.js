function stringLength(stringOne, stringTwo, stringThree) {

    let totalLength = stringOne.length + stringTwo.length + stringThree.length;
    let averageLength = Math.floor(totalLength / 3);
    
    console.log(totalLength);
    console.log(averageLength);
}
stringLength("chocolate", "ice cream", "cake");
stringLength("pasta", "5", "22.3");
