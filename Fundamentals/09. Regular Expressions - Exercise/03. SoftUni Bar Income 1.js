function softUniBarIncome(input) {
    const pattern = /%(?<customer>[A-Z][a-z]+)%([^|$%.])*<(?<product>\w+)>([^|$%.])*\|(?<count>\d+)\|([^|$%.])*?(?<price>\d+(\.\d+)?)\$/g;
    let totalIncome = 0;
    while (input[0] !== "end of shift") {
        const line = input.shift();
        const matches = line.matchAll(pattern);
        for (let match of matches) {
            totalIncome += match.groups.count * match.groups.price;
            console.log(`${match.groups.customer}: ${match.groups.product} - ${(match.groups.count * match.groups.price).toFixed(2)}`);
        }
    }
    console.log(`Total income: ${totalIncome.toFixed(2)}`);
}
