function radioCrystals(array){
    let targetThickness = array.shift()
    for (let currentThickness of array) {
        console.log(`Processing chunk ${currentThickness} microns`)
        while (currentThickness > targetThickness){
            

            let cuts = 0
            while ( currentThickness / 4 >= targetThickness){
                currentThickness = currentThickness / 4
                cuts++
            }
            if ( cuts > 0){
            console.log(`Cut x${cuts}`)
            console.log('Transporting and washing')
            currentThickness = Math.floor(currentThickness)
            }
            if (currentThickness === targetThickness){
                break;
            }

            let laps = 0
            while ( currentThickness * 0.8 >= targetThickness){
                currentThickness = currentThickness * 0.8
                laps++
            }
            if (laps > 0){
            console.log(`Lap x${laps}`)
            console.log('Transporting and washing')
            currentThickness = Math.floor(currentThickness)
            }
            if (currentThickness === targetThickness){
                break;
            }

            let grind = 0
            while ( currentThickness - 20 >= targetThickness){
                currentThickness -= 20
                grind++
            }
            if (grind > 0){
            console.log(`Grind x${grind}`)
            console.log('Transporting and washing')
            currentThickness = Math.floor(currentThickness)
            }
            if (currentThickness === targetThickness ){
                break;
            }

            let etch = 0
            while (currentThickness - 2 >= targetThickness || currentThickness - 2 >= targetThickness - 1){
                currentThickness -= 2
                etch++
            }
            if (etch > 0){
            console.log(`Etch x${etch}`)
            console.log('Transporting and washing')
            currentThickness = Math.floor(currentThickness)
            }
            if (currentThickness === targetThickness){
                break;
            }

            while ( currentThickness === targetThickness - 1){
                currentThickness += 1
                console.log(`X-ray x1`)
            }
            if (currentThickness === targetThickness){
                break;
            }
            currentThickness = Math.floor(currentThickness)
        }
        console.log(`Finished crystal ${targetThickness} microns`)
    }
}
//radioCrystals([1375, 50000])
//radioCrystals([1000, 4000, 8100])
radioCrystals([100, 100.5]) 