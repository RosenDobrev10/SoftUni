function password(input) {
    let index = 0;
    let username = input[index++];
    let correctPassword = input[index++];
    let password = input[index++];

    while (password !== correctPassword) {
        password = input[index++];
    }
    console.log(`Welcome ${username}!`);
}
password(["Nakov", "1234", "Pass", "1324", "1234"]);
