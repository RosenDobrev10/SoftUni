function playingCards(face, suit) {
    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663',
    };
    if (!faces.includes(face) || !suits[suit]) {
        throw new Error("Error");
    }

    const card = {
        face,
        suit: suits[suit],
        toString() {
            return this.face + this.suit
        }
    };

    return card;

}
