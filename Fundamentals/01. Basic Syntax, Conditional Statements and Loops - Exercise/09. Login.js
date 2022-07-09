function login(input) {
    
    // SPLIT = Разделя стринг на символи ; REVERSE = обръща обратно символите; JOIN = събира символите обратно в стринг
    let username = input[0];
    let password = username.split("").reverse().join("");
    let tries = 0;
    for (let i = 1; i < input.length; i++) {
        tries++;
        let currentPassword = input[i];
        if (currentPassword === password) {
            console.log(`User ${username} logged in.`);
        } else {
            if (tries === 4) {
                console.log(`User ${username} blocked!`)
                break;
            } else {
                console.log("Incorrect password. Try again.");
            }
        }
    }
}
login(["Acer", "login", "go", "let me in", "recA"]);
