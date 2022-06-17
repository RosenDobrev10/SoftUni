function blackFlag(input) {

    let days = Number(input[0])
    let plunderForDay = Number(input[1])
    let expectedPlunder = Number(input[2])
    let gainedPlunder = 0

    for (let i = 1; i <= days; i++){
        gainedPlunder += plunderForDay 
        if (i % 3 === 0) {
            gainedPlunder += 0.5 * plunderForDay
        }
        if ( i % 5 === 0) {
            gainedPlunder *= 0.7
        }
    }
    if (gainedPlunder >= expectedPlunder){
        console.log(`Ahoy! ${gainedPlunder.toFixed(2)} plunder gained.`)
    } else {
        let percentage = gainedPlunder / expectedPlunder * 100
        console.log(`Collected only ${percentage.toFixed(2)}% of the plunder.`)
    }
}
blackFlag(["5", "40", "100"]);
blackFlag(["10", "20", "380"]);
