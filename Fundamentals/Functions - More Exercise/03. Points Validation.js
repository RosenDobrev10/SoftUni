function pointsValidation(array){

    let x1 = array[0]
    let y1 = array[1]
    let x2 = array[2]
    let y2 = array[3]

    // Формула за изчисляване дали разстоянието между две точки е цяло число(валидно)
    let distance1 = Math.sqrt((Math.pow(0-x1, 2)) + (Math.pow(0-y1, 2)))     
    let distance2 = Math.sqrt((Math.pow(x2-0, 2)) + (Math.pow(y2-0, 2)))
    let distance3 = Math.sqrt((Math.pow(x2-x1, 2)) + (Math.pow(y2-y1, 2)))

    if (Number.isInteger(distance1)){
        console.log(`{${x1}, ${y1}} to {0, 0} is valid`)
    } else {
        console.log(`{${x1}, ${y1}} to {0, 0} is invalid`)
    }

    if (Number.isInteger(distance2)){
        console.log(`{${x2}, ${y2}} to {0, 0} is valid`)
    } else {
        console.log(`{${x2}, ${y2}} to {0, 0} is invalid`)
    }

    if (Number.isInteger(distance3)){
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`)
    } else {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`)
    }
}
//pointsValidation([3, 0, 0, 4])
pointsValidation([2, 1, 1, 1])