function catalogue(arr) {
    let catalog = {}
    for (let line of arr) {
        let [product, price] = line.split(" : ")
        price = Number(price)
        catalog[product] = price
    }
    let sortedCatalog = Object.keys(catalog).sort((a, b) => a.localeCompare(b))
    let firstLetter = ''
    for (let product of sortedCatalog) {
        let currentFirstLetter = product[0]
        if (currentFirstLetter !== firstLetter) {
            firstLetter = currentFirstLetter
            console.log(firstLetter)
        }
        console.log(`  ${product}: ${catalog[product]}`)
    }
}
