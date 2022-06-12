function cinema(input) {
    let index = 0;
    let fullCapacity = Number(input[index++]);
    let command = input[index++];
    let allPeople = 0;
    let income = 0;

    while (command !== "Movie time!") {
        people = Number(command);
        allPeople += people;
        if (allPeople > fullCapacity) {
            console.log("The cinema is full.");
            break;
        }
        let bill = people * 5;
        if (people % 3 === 0) {
            bill -= 5;
        }
        income += bill;
        command = input[index++];
    }
    if (command === "Movie time!") {
        console.log(`There are ${fullCapacity - allPeople} seats left in the cinema.`);
        console.log(`Cinema income - ${income} lv.`);
    } else {
        console.log(`Cinema income - ${income} lv.`);
    }
}
cinema(["100","10","10","10","10","10","10","10","10","10","10","Movie time!",]);
