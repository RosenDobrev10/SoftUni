function easterDecoration(input) {
    let index = 0;
    let clients = Number(input[index++]);
    let allBills = 0;
    for (let i = 0; i < clients; i++) {
        let command = input[index++];
        let purchases = 0;
        let bill = 0;
        while (command !== "Finish") {
            purchases++;
            switch (command) {
                case "basket":bill += 1.5;break;
                case "wreath":bill += 3.8;break;
                case "chocolate bunny":bill += 7;break;
            }
            command = input[index++];
        }
        if (purchases % 2 === 0) {
            bill *= 0.8;
        }
        allBills += bill;
        console.log(`You purchased ${purchases} items for ${bill.toFixed(2)} leva.`);
    }
    let averageBill = allBills / clients;
    console.log(`Average bill per client is: ${averageBill.toFixed(2)} leva.`);
}
easterDecoration(["2","basket","wreath","chocolate bunny","Finish","wreath","chocolate bunny","Finish",]);
