function meetings(arr) {
    let meetings = {};
    arr.forEach((line) => {
        let [day, name] = line.split(" ");
        if (meetings[day] === undefined) {
            meetings[day] = name;
            console.log(`Scheduled for ${day}`);
        } else {
            console.log(`Conflict on ${day}!`);
        }
    });

    for (let [day, person] of Object.entries(meetings)) {
        console.log(`${day} -> ${person}`);
    }
}
