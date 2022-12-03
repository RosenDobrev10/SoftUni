function secretChat(input) {
    let message = input.shift();
    while (input[0] !== 'Reveal') {
        const [command, param1, param2] = input.shift().split(":|:");
        if (command === 'InsertSpace') {
            message = message.substring(0, Number(param1)) + " " + message.substring(Number(param1));
        } else if (command === 'Reverse') {
            if (message.includes(param1)) {
                message = message.substring(0, message.indexOf(param1)) + message.substring(message.indexOf(param1) + param1.length) + param1.split("").reverse().join("");
            } else {
                console.log('error');
                continue;
            }
        } else if (command === 'ChangeAll') {
            message = message.split(param1).join(param2);
        }
        console.log(message);
    }
    console.log(`You have a new text message: ${message}`);
}
