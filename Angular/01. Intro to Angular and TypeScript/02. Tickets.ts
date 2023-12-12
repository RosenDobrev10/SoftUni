class Ticket {
	destination: string;
	price: number;
	status: string;

	constructor(destination: string, price: number, status: string) {
		this.destination = destination;
		this.price = price;
		this.status = status;
	}
}

function manageTickets(tickets: string[], criteria: string): Ticket[] {
	const sortCriteria = {
		destination: (a: Ticket, b: Ticket) =>a.destination.localeCompare(b.destination),
		price: (a: Ticket, b: Ticket) => a.price - b.price,
		status: (a: Ticket, b: Ticket) => a.status.localeCompare(b.status)
	};

	const allTickets: Ticket[] = tickets.map((ticket) => {
		let [destination, price, status] = ticket.split('|');
		const priceNum: number = Number(price);
		return new Ticket(destination, priceNum, status);
	});

	return allTickets.sort(sortCriteria[criteria]);
}

console.log(manageTickets(
		[
			'Philadelphia|94.20|available',
			'New York City|95.99|available',
			'New York City|95.99|sold',
			'Boston|126.20|departed'
		],
		'destination'));

console.log(manageTickets(
		[
			'Philadelphia|94.20|available',
			'New York City|95.99|available',
			'New York City|95.99|sold',
			'Boston|126.20|departed'
		],
		'status'));

console.log(manageTickets(
		[
			'Philadelphia|94.20|available',
			'New York City|95.99|available',
			'New York City|95.99|sold',
			'Boston|126.20|departed'
		],
		'price'));
