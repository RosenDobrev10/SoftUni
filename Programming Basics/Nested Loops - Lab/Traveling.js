function travelling(input) {
    let index = 0;
    let command = input[index++];

    while (command !== "End") {
        destination = command;
        target = Number(input[index++]);
        let budget = 0;
        while (budget < target) {
            let money = Number(input[index++]);
            budget += money;
            if (budget >= target) {
                console.log(`Going to ${destination}!`);
                break;
            }
            money = input[index];
        }
        command = input[index++];
    }
}
travelling(["France", "2000", "300", "300", "200", "400", "190", "258", "360",
"Portugal", "1450", "400", "400", "200", "300", "300",
"Egypt", "1900", "1000", "280", "300", "500", "End"])