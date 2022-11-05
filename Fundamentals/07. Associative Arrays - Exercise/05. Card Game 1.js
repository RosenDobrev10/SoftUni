function cardGame(arr) {
    let powers = { '1': 10, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
    let types = { 'S': 4, 'H': 3, 'D': 2, 'C': 1};
    let players = {};
    arr.forEach(line => {
        let [player, hand] = line.split(": ");
        let cards = hand.split(", ");
        players[player] === undefined ? players[player] = [] : null;
        cards.forEach(card => !players[player].includes(card) ? players[player].push(card) : null);
    })
    for (let [player, cards] of Object.entries(players)) {
        let sum = 0;
        cards.forEach(card => {
            let power = card.slice(0, 1);
            let type = card.slice(-1);
            sum += powers[power] * types[type];
        })
        console.log(`${player}: ${sum}`);
    }
}
