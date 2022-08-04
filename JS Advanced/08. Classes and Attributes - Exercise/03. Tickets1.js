function tickets(arr, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }
    let tickets = [];

    for (let line of arr) {
        let [destination, price, status] = line.split("|");
        let ticket = new Ticket(destination, price, status);
        tickets.push(ticket);
    }

    criteria === 'price' ? tickets.sort((a, b) => a[criteria] - (b[criteria])) : tickets.sort((a, b) => a[criteria].localeCompare(b[criteria]))

    return tickets;
}
tickets(
    [
        "Philadelphia|94.20|available",

        "New York City|95.99|available",

        "New York City|95.99|sold",

        "Boston|126.20|departed",
    ],

    "destination"
);

tickets(['Philadelphia|94.20|available',

    'New York City|95.99|available',

    'New York City|95.99|sold',

    'Boston|126.20|departed'],

    'status')