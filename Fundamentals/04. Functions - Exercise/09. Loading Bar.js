function loadingBar(number){
    let loadingbar = [".",".",".",".",".",".",".",".",".","."]
    let splicedPosition = 0
    for (let i = 10; i <= number; i+= 10) {
        if (number % i >= 0){
            loadingbar.splice(splicedPosition,1,'%')
            splicedPosition++
            if (splicedPosition === 10){
                console.log(`${number}% Complete!`)
                console.log(`${number}% [${loadingbar.join("")}]`)
                return;
            }
        }
    }
    console.log(`${number}% [${loadingbar.join("")}]`)
    console.log('Still loading...')
}
// loadingBar(30)
loadingBar(50)
//loadingBar(100)