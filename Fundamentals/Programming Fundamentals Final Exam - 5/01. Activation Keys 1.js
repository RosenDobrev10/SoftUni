function activationKeys(input) {
    let activationKey = input.shift();
    while (input[0] !== "Generate") {
        const [param1, param2, param3, param4] = input.shift().split(">>>");
        if (param1 === "Contains") {
            activationKey.includes(param2) ? console.log(`${activationKey} contains ${param2}`) : console.log("Substring not found!");
        } else if (param1 === "Flip") {
            let flipped = "";
            param2 === "Upper"
                ? flipped = activationKey.substring(Number(param3), Number(param4)).toUpperCase()
                : flipped = activationKey.substring(Number(param3), Number(param4)).toLowerCase();
            activationKey = activationKey.substring(0, Number(param3)) + flipped + activationKey.substring(Number(param4));
            console.log(activationKey);
        } else if (param1 === "Slice") {
            activationKey = activationKey.substring(0, Number(param2)) + activationKey.substring(Number(param3));
            console.log(activationKey);
        }
    }
    console.log(`Your activation key is: ${activationKey}`);
}
