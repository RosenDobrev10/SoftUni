function replaceRepeatingChars(string) {
    let result = '';
    for (let i = 0; i < string.length; i++) {
        string[i] !== string[i + 1] ? result += string[i] : null;
    }
    console.log(result);
}
