function minerTask(input) {

    let resources = {};                                         // Създаваме празен обект, в който ще слагаме ресурсите

    for (let i = 0; i < input.length; i += 2) {                 // Минаваме по масива през 2, за да взимаме само ресурсите
        let [resource, quantity] = [input[i], input[i + 1]];    // Правим две променливи, ресурс и количество
        !resources.hasOwnProperty(resource) ? (resources[resource] = Number(quantity)) : (resources[resource] += Number(quantity));
        // Ако ресурса го няма създаваме пропърти с ресурса и количеството, ако го има просто го добавяме
    }

    for (let resource in resources) {                            // Минаваме по всеки ресурс от ресурсите 
        console.log(`${resource} -> ${resources[resource]}`);   // Печатаме ресурса и неговото количество
    }
}
minerTask(["gold", "155", "silver", "10", "copper", "17", "gold", "15"]);
