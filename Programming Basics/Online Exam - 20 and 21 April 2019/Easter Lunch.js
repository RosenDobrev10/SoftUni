function easterLunch(input){
    let easterCake = Number(input[0])
    let cartonEggs = Number(input[1])
    let cookie = Number(input[2])
    let priceCake = easterCake * 3.2
    let priceEggs = cartonEggs * 4.35 + ( cartonEggs * 12 * 0.15)
    let priceCookie = cookie * 5.4
    let finalSum = priceCake + priceEggs + priceCookie
    console.log(finalSum.toFixed(2))
}
easterLunch(["2","3","2"])

