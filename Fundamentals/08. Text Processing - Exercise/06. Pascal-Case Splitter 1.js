function pascalCaseSplitter(string) {
    let result = string[0];
    for (let i = 1; i < string.length; i++) {
        string[i].charCodeAt() >= 65 && string[i].charCodeAt() <= 90 ? result += ", " : null;
        result += string[i];
    }
    console.log(result);
}
