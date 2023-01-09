class Triathlon {
    constructor(competitionName) {
        this.competitionName = competitionName;
        this.participants = {};
        this.listOfFinalists = [];
    }

    addParticipant(participantName, participantGender) {
        if (this.participants[participantName]) {
            return `${participantName} has already been added to the list`;
        } else {
            this.participants[participantName] = participantGender;
            return `A new participant has been added - ${participantName}`;
        }
    }

    completeness(participantName, condition) {
        if (!this.participants[participantName]) {
            throw new Error(`${participantName} is not in the current participants list`);
        }
        if (this.participants[participantName] && condition < 30) {
            throw new Error(`${participantName} is not well prepared and cannot finish any discipline`);
        }
        const completedCount = Math.floor(condition / 30);
        if (completedCount < 3) {
            return `${participantName} could only complete ${completedCount} of the disciplines`;
        } else {
            this.listOfFinalists.push({
                participantName,
                participantGender: this.participants[participantName],
            });
            delete this.participants[participantName];
            return `Congratulations, ${participantName} finished the whole competition`;
        }
    }

    rewarding(participantName) {
        const foundParticipant = this.listOfFinalists.find((participant) => participant.participantName === participantName);
        if (!foundParticipant) {
            return `${participantName} is not in the current finalists list`;
        } else {
            return `${participantName} was rewarded with a trophy for his performance`;
        }
    }

    showRecord(criteria) {
        if (this.listOfFinalists.length === 0) {
            return `There are no finalists in this competition`;
        }
        if (criteria === "all") {
            const result = [`List of all ${this.competitionName} finalists:`];
            this.listOfFinalists
                .sort((a, b) => a.participantName.localeCompare(b.participantName))
                .forEach((finalist) => result.push(finalist.participantName));
            return result.join("\n");
        }
        const foundFinalist = this.listOfFinalists.find((finalist) => finalist.participantGender === criteria);
        if (!foundFinalist) {
            return `There are no ${criteria}'s that finished the competition`;
        } else {
            return `${foundFinalist.participantName} is the first ${criteria} that finished the ${this.competitionName} triathlon`;
        }
    }
}
const contest = new Triathlon("Dynamos");
console.log(contest.addParticipant("Peter", "male"));
console.log(contest.addParticipant("Sasha", "female"));
console.log(contest.completeness("Peter", 100));
console.log(contest.completeness("Sasha", 90));
console.log(contest.rewarding("Peter"));
console.log(contest.rewarding("Sasha"));
console.log(contest.showRecord("all"));
