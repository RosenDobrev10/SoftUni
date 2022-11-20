function santasSecretHelper(input) {
    const key = Number(input.shift());
    while (input[0] !== 'end') {
        const pattern = /@(?<name>[A-Za-z]+)[^@!:>-]*!(?<type>[GN])!/g;
        const line = input.shift();
        let decryptedMessage = "";
        for (let letter of line) {
            decryptedMessage += String.fromCharCode(letter.charCodeAt() - key);;
        }
        const match = pattern.exec(decryptedMessage);
        match && match.groups.type === "G" ? console.log(match.groups.name) : null;
    }
}
