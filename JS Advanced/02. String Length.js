function stringLength(stringOne, stringTwo, stringThree){

    let totalLength = stringOne.length + stringTwo.length + stringThree.length
    let average = Math.floor(totalLength / 3)
    console.log(totalLength)
    console.log(average)

}
stringLength('chocolate', 'ice cream', 'cake')
stringLength('pasta', '5', '22.3')