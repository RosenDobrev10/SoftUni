function blackFlag(arr) {
    const [day, plunderForDay, expectedPlunder] = arr.map(Number)
    let totalPlunder = 0
    for (let i = 1; i <= day; i++) {
        totalPlunder += plunderForDay
        i % 3 === 0 ? totalPlunder += plunderForDay * 0.5 : null
        i % 5 === 0 ? totalPlunder *= 0.7 : null
    }
    let percentage = totalPlunder / expectedPlunder * 100
    totalPlunder >= expectedPlunder
        ? console.log(`Ahoy! ${totalPlunder.toFixed(2)} plunder gained.`)
        : console.log(`Collected only ${percentage.toFixed(2)}% of the plunder.`)
}
