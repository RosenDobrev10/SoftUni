function mirrorWords(input) {
    const text = input[0];
    const pattern = /([@#])(?<word>[A-Za-z]{3,})\1\1(?<reverseWord>[A-Za-z]{3,})\1/g;
    const mirrorWords = [];
    const matches = Array.from(text.matchAll(pattern));
    matches.length === 0 ? console.log("No word pairs found!") : console.log(`${matches.length} word pairs found!`);
    matches.forEach(match => match.groups.word === match.groups.reverseWord.split("").reverse().join("") ? mirrorWords.push(`${match.groups.word} <=> ${match.groups.reverseWord}`) : null);
    mirrorWords.length === 0 ? console.log("No mirror words!") : console.log(`The mirror words are:\n${mirrorWords.join(", ")}`);
}
