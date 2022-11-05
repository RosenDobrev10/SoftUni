function partyTime(arr) {
    let VIP = [];
    let regular = [];
    while (arr[0] !== "PARTY") {
        let guest = arr.shift();
        guest[0].charCodeAt() >= 48 && guest[0].charCodeAt() <= 57 ? VIP.push(guest) : regular.push(guest);
    }
    arr.shift();
    arr.forEach(guest => VIP.includes(guest) ? VIP.splice(VIP.indexOf(guest), 1) : regular.splice(regular.indexOf(guest), 1));
    console.log(VIP.length + regular.length);
    VIP.forEach(guest => console.log(guest));
    regular.forEach(guest => console.log(guest));
}
