function treasureFinder(arr) {
    let sequence = arr.shift().split(" ").map(Number);
    while (arr[0] !== 'find') {
        let encrypted = '';
        let counter = 0;
        let decrypted = arr.shift();
        for (let letter of decrypted) {
            encrypted += String.fromCharCode(letter.charCodeAt() - sequence[counter]);
            counter === sequence.length - 1 ? counter = 0 : counter++;
        }
        let type = encrypted.substring(encrypted.indexOf("&") + 1, encrypted.lastIndexOf("&"));
        let coordinates = encrypted.substring(encrypted.indexOf("<") + 1, encrypted.lastIndexOf(">"));
        console.log(`Found ${type} at ${coordinates}`);
    }
}
