function thePianist(input) {
    const pieces = {};
    const n = Number(input.shift());
    for (let i = 0; i < n; i++) {
        const [piece, composer, key] = input.shift().split("|");
        pieces[piece] = { composer, key };
    }
    while (input[0] !== "Stop") {
        let [command, piece, composer, key] = input.shift().split("|");
        if (command === "Add") {
            if (pieces[piece]) {
                console.log(`${piece} is already in the collection!`);
            } else {
                pieces[piece] = { composer, key };
                console.log(`${piece} by ${composer} in ${key} added to the collection!`);
            }
        } else if (command === "Remove") {
            if (!pieces[piece]) {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
            } else {
                delete pieces[piece];
                console.log(`Successfully removed ${piece}!`);
            }
        } else if (command === "ChangeKey") {
            key = composer;
            if (!pieces[piece]) {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
            } else {
                pieces[piece].key = key;
                console.log(`Changed the key of ${piece} to ${key}!`);
            }
        }
    }
    for (const piece in pieces) {
        console.log(`${piece} -> Composer: ${pieces[piece].composer}, Key: ${pieces[piece].key}`);
    }
}
