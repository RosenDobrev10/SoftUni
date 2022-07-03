function sumOfNumbersNM(n, m){
    n = Number(n)
    m = Number(m)
    let sum = 0

    for (let i = n; i <= m; i++){
        sum += i
    }
    console.log(sum)
}   
sumOfNumbersNM('1', '5')
sumOfNumbersNM('-8', '20')