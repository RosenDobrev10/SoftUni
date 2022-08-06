function juiceFlavors(arr) {

    const juices = {};                                  // Създаваме обект за соковете
    const juiceBottles = {};                            // Създаваме обект за бутилките сокове 

    for (let line of arr) {                             // Минаваме по всеки ред от масива 
        let [juiceName, juiceQuantity] = line.split(" => ");    // Деструктурираме като сплитваме реда 
        if (!juices.hasOwnProperty(juiceName)) {                // Ако в обекта със сокове, нямаме такъв до момента 
            juices[juiceName] = 0;                              // Създаваме такова пропърти с начална стойност 0 
        }
        juices[juiceName] += Number(juiceQuantity);             // Добавяме към сока, неговото количество

        if (juices[juiceName] >= 1000) {                        // Ако количеството на някой сок, достигне 1000 или повече 
            let numberOfBottles = Math.floor(juices[juiceName] / 1000); // Създаваме бутилки като делим на 1000(за бутилка) и закръгляме надолу 
            if (!juiceBottles.hasOwnProperty(juiceName)) {     // Ако в бутилките сокове, нямаме още такъв вкус 
                juiceBottles[juiceName] = 0;                    // Създаваме такова пропърти с начална стойност 0
            }
            juiceBottles[juiceName] += numberOfBottles;         // Добавяме броя бутилки към сока 
            juices[juiceName] -= numberOfBottles * 1000;        // От количеството на сока изваждаме броя на бутилките по 1000 
        }
    }

    Object.entries(juiceBottles).forEach((juiceBottle) => console.log(`${juiceBottle[0]} => ${juiceBottle[1]}`));
    // Взимаме KВП на обекта с бутилките сокове, минаваме по всяка бутилка и на нулев индекс е вкуса, а на първи индекс е количеството
}
juiceFlavors([
    "Kiwi => 234",

    "Pear => 2345",

    "Watermelon => 3456",

    "Kiwi => 4567",

    "Pear => 5678",

    "Watermelon => 6789",
]);

juiceFlavors([
    "Orange => 2000",

    "Peach => 1432",

    "Banana => 450",

    "Peach => 600",

    "Strawberry => 549",
]);
