function partyTime(input) {

    let vipGuestsList = [];             // Правим масив за ВИП гостите 
    let regularGuestsList = [];         // правим масив за обикновените гости 

    while (input[0] !== 'PARTY') {          // въртим цикъла, докато не получим PARTY, за да разпределим поканите 
        let reservation = input.shift();    // взимаме първата покана  
        reservation[0].charCodeAt() >= 48 && reservation[0].charCodeAt() <= 57 ? vipGuestsList.push(reservation) : regularGuestsList.push(reservation);
        // проверяваме с какво започва поканата, ако е от 48 до 57 е цифра и е ВИП, иначе е обикновена 
    }

    for (let guest of input) {                                      // Минаваме по дошлите гости на партито
        if (vipGuestsList.indexOf(guest) >= 0) {                    // ако намерим такъв индекс във ВИП, различно от -1
            vipGuestsList.splice(vipGuestsList.indexOf(guest), 1);  // намираме на кой индекс е и я трием 
        }
        if (regularGuestsList.indexOf(guest) >= 0) {                        // ако намерим такъв индекс във обикновените, различно от -1
            regularGuestsList.splice(regularGuestsList.indexOf(guest), 1);  // намираме на кой индекс е и я трием 
        }
    }
    
    console.log(vipGuestsList.length + regularGuestsList.length);   // Сбора от недошлите гости е дължината на двата масива 
    vipGuestsList.forEach(el => console.log(el));                   // Минаваме и печатаме първо ВИПОВЕТЕ 
    regularGuestsList.forEach(el => console.log(el));               // после печатаме обикновените 
}
//partyTime(['7IK9Yo0h', '9NoBUajQ', 'Ce8vwPmE', 'SVQXQCbc', 'tSzE5t0p', 'PARTY', '9NoBUajQ', 'Ce8vwPmE', 'SVQXQCbc' ])
partyTime(['m8rfQBvl', 'fc1oZCE0', 'UgffRkOn', '7ugX7bm0', '9CQBGUeJ', '2FQZT3uC', 'dziNz78I', 'mdSGyQCJ', 'LjcVpmDL', 
'fPXNHpm1', 'HTTbwRmM', 'B5yTkMQi', '8N0FThqG', 'xys2FYzn', 'MDzcM9ZK', 'PARTY', '2FQZT3uC', 'dziNz78I', 'mdSGyQCJ', 
'LjcVpmDL', 'fPXNHpm1', 'HTTbwRmM', 'B5yTkMQi', '8N0FThqG', 'm8rfQBvl', 'fc1oZCE0', 'UgffRkOn', '7ugX7bm0', '9CQBGUeJ' ])