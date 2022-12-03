function theImitationGame(input) {
    let encryptedMessage = input.shift();
    while (input[0] !== "Decode") {
        const [command, param1, param2] = input.shift().split("|");
        if (command === "Move") {
            encryptedMessage = encryptedMessage.substring(Number(param1)) + encryptedMessage.substring(0, Number(param1));
        } else if (command === "Insert") {
            encryptedMessage = encryptedMessage.substring(0, Number(param1)) + param2 + encryptedMessage.substring(Number(param1));
        } else if (command === "ChangeAll") {
            encryptedMessage = encryptedMessage.split(param1).join(param2);
        }
    }
    console.log(`The decrypted message is: ${encryptedMessage}`);
}
