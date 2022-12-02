function worldTour(input) {
    let stops = input.shift();
    while (input[0] !== "Travel") {
        const [command, param1, param2] = input.shift().split(":");
        if (command === "Add Stop") {
            stops[param1] !== undefined ? (stops =stops.substring(0, Number(param1)) + param2 + stops.substring(Number(param1))) : null;
            console.log(stops);
        } else if (command === "Remove Stop") {
            stops[param1] && stops[param2] !== undefined ? (stops = stops.substring(0, Number(param1)) + stops.substring(Number(param2) + 1)) : null;
            console.log(stops);
        } else if (command === "Switch") {
            stops.includes(param1) ? (stops = stops.split(param1).join(param2)) : null; 
            console.log(stops);
        }
    }
    console.log(`Ready for world tour! Planned stops: ${stops}`);
}
