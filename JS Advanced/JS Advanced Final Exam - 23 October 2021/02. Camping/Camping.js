class Camping {

    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = { child: 150, student: 300, collegian: 500 };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (this.priceForTheCamp.hasOwnProperty(condition) === false) {
            throw new Error("Unsuccessful registration at the camp.");
        }
        const foundName = this.listOfParticipants.find((participant) => participant.name === name);
        if (this.listOfParticipants.includes(foundName)) {
            return `The ${name} is already registered at the camp.`;
        }
        if (money < this.priceForTheCamp[condition]) {
            return `The money is not enough to pay the stay at the camp.`;
        }
        const participant = { name, condition, power: 100, wins: 0 };
        this.listOfParticipants.push(participant);
        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        const foundName = this.listOfParticipants.find((participant) => participant.name === name);
        const foundNameIndex = this.listOfParticipants.findIndex((participant) => participant.name === name);

        if (foundName === undefined) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }
        this.listOfParticipants.splice(foundNameIndex, 1);
        return `The ${name} removed successfully.`;
    }

    timeToPlay(typeOfGame, participant1, participant2) {
        const player1 = this.listOfParticipants.find((participant) => participant.name === participant1);
        const player2 = this.listOfParticipants.find((participant) => participant.name === participant2);

        if (typeOfGame === "Battleship") {
            if (player1 === undefined) {
                throw new Error(`Invalid entered name/s.`);
            }
            player1.power += 20;
            return `The ${player1.name} successfully completed the game ${typeOfGame}.`;
        } else if (typeOfGame === "WaterBalloonFights") {
            if (player1 === undefined || player2 === undefined) {
                throw new Error(`Invalid entered name/s.`);
            }
            if (player1.condition !== player2.condition) {
                throw new Error(`Choose players with equal condition.`);
            }
            if (player1.power === player2.power) {
                return `There is no winner.`;
            } else if (player1.power > player2.power) {
                player1.wins++;
                return `The ${player1.name} is winner in the game ${typeOfGame}.`;
            } else {
                player2.wins++;
                return `The ${player2.name} is winner in the game ${typeOfGame}.`;
            }
        }
    }

    toString() {
        let result = [`${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`,];
        let sorted = this.listOfParticipants.sort((a, b) => b.wins - a.wins);
        sorted.forEach((participant) => result.push(`${participant.name} - ${participant.condition} - ${participant.power} - ${participant.wins}`));
        return result.join("\n");
    }
}
const summerCamp = new Camping(
    "Jane Austen",
    "Pancharevo Sofia 1137, Bulgaria"
);
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
console.log(
    summerCamp.timeToPlay(
        "WaterBalloonFights",
        "Petar Petarson",
        "Sara Dickinson"
    )
);
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(
    summerCamp.timeToPlay(
        "WaterBalloonFights",
        "Petar Petarson",
        "Dimitur Kostov"
    )
);
console.log(summerCamp.toString());
