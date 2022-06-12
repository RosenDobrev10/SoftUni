function readText(input) {
    let index = 0;
    let text = input[index++];

    while (text !== "Stop") {
        console.log(text);
        text = input[index++];
    }
}
readText(["Nakov","SoftUni","Sofia","Bulgaria","SomeText","Stop","AfterStop","Europe","HelloWorld"]);
