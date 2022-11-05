function aMinerTask(arr) {
    let resources = {};
    for (let i = 0; i < arr.length; i += 2) {
        let currentResource = arr[i];
        let currentQuantity = Number(arr[i + 1]);
        if (resources[currentResource] === undefined) {
            resources[currentResource] = 0;
        }
        resources[currentResource] += currentQuantity;
    }
    for (let [resource, quantity] of Object.entries(resources)) {
        console.log(`${resource} -> ${quantity}`);
    }
}
