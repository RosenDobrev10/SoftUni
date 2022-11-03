function flightSchedule(arr) {
    let listOfFlights = {};
    let flights = arr.shift();
    let changedFlights = arr.shift();
    let flightStatus = arr.shift()[0];

    for (let line of flights) {
        let [flightNumber, ...destination] = line.split(" ");
        let dest = destination[0]
        destination.length === 2 ? dest = `${destination[0]} ${destination[1]}` : null
        listOfFlights[flightNumber] = { Destination: dest, Status: "Ready to fly", };
    }

    for (let line of changedFlights) {
        let [numberOfFlight, status] = line.split(" ");
        listOfFlights[numberOfFlight] !== undefined ? listOfFlights[numberOfFlight].Status = status : null;
    }

    for (let flight in listOfFlights) {
        listOfFlights[flight].Status === flightStatus ? console.log(listOfFlights[flight]) : null;
    }
}
