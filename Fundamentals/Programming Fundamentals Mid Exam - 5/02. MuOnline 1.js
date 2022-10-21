function MuOnline(arr) {
    let health = 100;
    let bitcoins = 0;
    let rooms = arr.split("|");
    for (let i = 0; i < rooms.length; i++) {
        let [command, number] = rooms[i].split(" ");
        number = Number(number);
        if (command === "potion") {
            let currentHealth = health;
            health += number;
            health > 100 ? (health = 100) : null;
            console.log(`You healed for ${health - currentHealth} hp.`);
            console.log(`Current health: ${health} hp.`);
        } else if (command === "chest") {
            bitcoins += number;
            console.log(`You found ${number} bitcoins.`);
        } else {
            health -= number;
            if (health > 0) {
                console.log(`You slayed ${command}.`);
            } else {
                console.log(`You died! Killed by ${command}.`);
                return console.log(`Best room: ${i + 1}`);
            }
        }
    }
    console.log(`You've made it!\nBitcoins: ${bitcoins}\nHealth: ${health}`);
}
