function deckOfCards(arr) {
    let listOfCards = arr.shift().split(", ");
    let numberOfCommands = Number(arr.shift());
    for (let i = 0; i < numberOfCommands; i++) {
        let [command, param1, param2] = arr[i].split(", ");
        if (command === "Add") {
            if (listOfCards.includes(param1)) {
                console.log("Card is already in the deck");
            } else {
                listOfCards.push(param1);
                console.log("Card successfully added");
            }
        } else if (command === "Remove") {
            if (listOfCards.includes(param1)) {
                listOfCards = listOfCards.filter((card) => card !== param1);
                console.log("Card successfully removed");
            } else {
                console.log("Card not found");
            }
        } else if (command === "Remove At") {
            param1 = Number(param1);
            if (listOfCards[param1] === undefined) {
                console.log("Index out of range");
            } else {
                listOfCards.splice(param1, 1);
                console.log("Card successfully removed");
            }
        } else if (command === "Insert") {
            param1 = Number(param1);
            if (listOfCards[param1] !== undefined && listOfCards.includes(param2)) {
                console.log("Card is already added");
            } else if (listOfCards[param1] === undefined) {
                console.log("Index out of range");
            } else if (listOfCards[param1] !== undefined && !listOfCards.includes(param2)) {
                listOfCards.splice(param1, 0, param2);
                console.log("Card successfully added");
            }
        }
    }
    console.log(listOfCards.join(", "));
}
deckOfCards([
    "Jack of Spades, Ace of Clubs, Jack of Clubs",
    "2",
    "Insert, -1, Queen of Spades",
    "Remove At, 1",
]);
