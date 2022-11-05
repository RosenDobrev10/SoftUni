function storage(arr) {
    let storage = {};
    arr.forEach((line) => {
        let [item, quantity] = line.split(" ");
        storage[item] === undefined ? storage[item] = 0 : null;
        storage[item] += Number(quantity);
    });
    for (let [item, quantity] of Object.entries(storage)) {
        console.log(`${item} -> ${quantity}`);
    }
}
