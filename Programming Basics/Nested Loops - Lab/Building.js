function building(input) {
    let floor = Number(input[0]);
    let room = Number(input[1]);
    
    for (let i = floor; i > 0; i--) { // i = floor
        let string = "";
        for (let j = 0; j < room; j++) { // j = room
            if (i === floor) {
                string += `L${i}${j} `;
            } else if (i % 2 === 0) {
                string += `O${i}${j} `;
            } else if (i % 2 === 1) {
                string += `A${i}${j} `;
            }
        }
        console.log(string);
    }
}
building(["4", "4"]);
