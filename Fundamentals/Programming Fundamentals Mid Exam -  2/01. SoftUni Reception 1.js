function softUniReception(arr) {
    let [first, second, third, students] = arr.map(Number);
    let hours = 0;
    while (students > 0) {
        hours++;
        hours % 4 === 0 ? null : students -= first + second + third;
    }
    console.log(`Time needed: ${hours}h.`);
}
