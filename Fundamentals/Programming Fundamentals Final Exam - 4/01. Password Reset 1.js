function passwordReset(input) {
    let password = input.shift();
    while (input[0] !== "Done") {
        const [command, param1, param2] = input.shift().split(" ");
        if (command === "TakeOdd") {
            let newPassword = "";
            for (let i = 1; i < password.length; i += 2) {
                newPassword += password[i];
            }
            console.log((password = newPassword));
        } else if (command === "Cut") {
            console.log((password = password.substring(0, Number(param1)) + password.substring(Number(param1) + Number(param2))));
        } else if (command === "Substitute") {
            password.includes(param1) ? console.log((password = password.split(param1).join(param2))) : console.log("Nothing to replace!");
        }
    }
    console.log(`Your password is: ${password}`);
}
