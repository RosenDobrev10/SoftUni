function emojiDetector(input) {
    const text = input[0];
    const digitPattern = /\d/g;
    const emojiPattern = /(:{2}|\*{2})(?<emoji>[A-Z][a-z]{2,})\1/g;
    const treshold = Array.from(text.matchAll(digitPattern)).reduce((a, b) => a * b);
    const emojis = Array.from(text.matchAll(emojiPattern)).length;
    console.log(`Cool threshold: ${treshold}`);
    console.log(`${emojis} emojis found in the text. The cool ones are:`);
    for (let emoji of text.matchAll(emojiPattern)) {
        let sum = 0;
        for (let char of emoji.groups.emoji) {
            sum += char.charCodeAt();
        }
        sum >= treshold ? console.log(emoji[0]) : null;
    }
}
