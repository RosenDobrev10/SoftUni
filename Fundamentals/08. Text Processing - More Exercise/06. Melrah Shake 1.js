function melrahShake(input) {
    let [text, pattern] = input
    while (pattern.length > 0) {
        let firstMatch = text.indexOf(pattern);
        let lastMatch = text.lastIndexOf(pattern);
        if (firstMatch !== lastMatch && firstMatch > -1 && lastMatch > -1) {
            text = text.split('');
            text.splice(firstMatch, pattern.length);
            text = text.join('');
            lastMatch = text.lastIndexOf(pattern);
            text = text.split('')
            text.splice(lastMatch, pattern.length)
            text = text.join('')
            let letterToDelete = pattern[Math.floor(pattern.length / 2)]
            pattern = pattern.replace(letterToDelete, '');
            console.log('Shaked it.');
        } else {
            break;
        }
    }
    console.log('No shake.');
    console.log(text);
}
