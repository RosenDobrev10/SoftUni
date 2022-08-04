function tickets(arr, criteria) {
    class Ticket {                                  // Създаваме клас с име Ticket 
        constructor(destination, price, status) {   // Конструктора, получава 3 параметъра 
            this.destination = destination;         
            this.price = Number(price);
            this.status = status;
        }
    }
    let tickets = [];                                           // Създаваме масив, в който ще пазим създадените билети 

    while (arr[0] !== undefined) {                              // Докато има елементи от масива 
        let line = arr.shift();                                 // Изваждаме реда от масива 
        let [destination, price, status] = line.split("|");     // Делим го по | и го деструктурираме на трите променливи 
        let ticket = new Ticket(destination, price, status);    // Създаваме нов билет от класа и конструктора
        tickets.push(ticket);                                   // Инстанцията я добавяме в масива с билети 
    }

    if (criteria === 'price') {                                 // Ако критерия е по цена 
        tickets.sort((a, b) => a[criteria] - (b[criteria]));    // Ползваме сравняваща функция за числа a - b
    } else {
        tickets.sort((a, b) => a[criteria].localeCompare(b[criteria])); // Ползваме сравняваща функция за букви localeCompare 
    }

    return tickets;                                             // Връщаме сортирания масив с обекти 
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
