function echoType(text) {
    let type = typeof text;
    console.log(type);
    if (type === "string" || type === "number") {
        console.log(text);
    } else {
        console.log("Parameter is not suitable for printing");
    }
}
echoType('Hello, JavaScript!');
echoType(18);
echoType(null);
