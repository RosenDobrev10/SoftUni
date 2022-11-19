function furniture(input) {
    const pattern = />>(?<furniture>[A-Z][A-Za-z]+)<<(?<price>\d+(\.\d+)?)!(?<quantity>\d+)/g;
    let totalPrice = 0;
    console.log("Bought furniture:")
    while (input[0] !== 'Purchase') {
        let line = input.shift();
        let matches = line.matchAll(pattern);
        for (let match of matches){
            console.log(match.groups.furniture);
            totalPrice += match.groups.price * match.groups.quantity;
        }
    }
    console.log(`Total money spend: ${totalPrice.toFixed(2)}`)
}
