function arrayRotation(array, rotations){

    for (let i = 0; i < rotations; i++){
        let firstElement = array.shift()    // shift = Премахва първия елемент от масива и той намаля своята дължина с единица.
        array.push(firstElement)            // Добавяме извадения елемент с shift към масива отново накрая.
        }
    console.log(array.join(" "))
}
arrayRotation([51, 47, 32, 61, 21], 2)
arrayRotation([32, 21, 61, 1], 4)
arrayRotation([2, 4, 15, 31], 5)