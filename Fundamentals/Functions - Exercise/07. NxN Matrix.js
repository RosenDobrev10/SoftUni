function nXnMatrix(n){
    
    for (let i = 0; i < n; i++) {
        let printline = ""
        for (let j = 0; j < n; j++) {
            printline += n + " "
        }
        console.log(printline)
    }
}
nXnMatrix(3)
//nXnMatrix(7)
//nXnMatrix(2)