function cinemaTickets(input) {
    let index = 0;
    let command = input[index++];
    let studentTicketCounter = 0;
    let standardTicketCounter = 0;
    let kidTicketCounter = 0;
    while (command !== "Finish") {
        movie = command;
        let emptySeats = Number(input[index++]);
        let newCommand = input[index++];
        let soldTicket = 0;
        while (newCommand !== "End") {
            let ticketType = newCommand;
            soldTicket++;
            switch (ticketType) {
                case "student":studentTicketCounter++;break;
                case "standard":standardTicketCounter++;break;
                case "kid":kidTicketCounter++;break;
            }
            if (soldTicket === emptySeats) {
                break;
            }
            newCommand = input[index++];
        }
        let fullness = (soldTicket / emptySeats) * 100;
        console.log(`${movie} - ${fullness.toFixed(2)}% full.`);
        command = input[index++];
    }
    let totalTickets =studentTicketCounter + standardTicketCounter + kidTicketCounter;
    let percentStudentTickets = (studentTicketCounter / totalTickets) * 100;
    let percentStandardTickets = (standardTicketCounter / totalTickets) * 100;
    let percentKidTickets = (kidTicketCounter / totalTickets) * 100;
    console.log(`Total tickets: ${totalTickets}`);
    console.log(`${percentStudentTickets.toFixed(2)}% student tickets.`);
    console.log(`${percentStandardTickets.toFixed(2)}% standard tickets.`);
    console.log(`${percentKidTickets.toFixed(2)}% kids tickets.`);
}
cinemaTickets(["The Matrix","20","student","standard","kid","kid","student","student","standard","student","End",
"The Green Mile","17","student","standard","standard","student","standard","student","End",
"Amadeus","3","standard","standard","standard","Finish",]);