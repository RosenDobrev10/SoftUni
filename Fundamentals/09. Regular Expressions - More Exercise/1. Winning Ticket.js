function winningTicket(tickets){
    const pattern = /(?=.{20}).*?(?=(?<ch>[@#$^]))(?<match>\k<ch>{6,}).*(?<=.{10})\k<match>.*/;
    const ticketsArr = tickets.split(/\s*,\s*/g);
    for (let ticket of ticketsArr){
        let match = pattern.exec(ticket);
        if (match){
            if (match.groups.match.length >= 6 && match.groups.match.length <= 9){
                console.log(`ticket "${ticket}" - ${match.groups.match.length}${match.groups.ch}`);
            } else if (match.groups.match.length === 10){
                console.log(`ticket "${ticket}" - ${match.groups.match.length}${match.groups.ch} Jackpot!`) ;                               
            }          
        } else if (ticket.length !== 20){
            console.log('invalid ticket');
        } else {
            console.log(`ticket "${ticket}" - no match`);
        }
    }
}
winningTicket('Cash$$$$$$Ca$$$$$$sh')
winningTicket('$$$$$$$$$$$$$$$$$$$$, aabb , th@@@@@@eemo@@@@@@ey')
winningTicket('validticketnomatch:(')
