function serializeString(input) {

    input = input[0];                                   // Взимаме елемента от нулев индекс
    let letters = {};                                   // Правим обект с намерените букви

    for (let i = 0; i < input.length; i++) {            // Минаваме по всяка буква от масива 
        let currentLetter = input[i];                   // Взимаме текущата буква 
        if (!letters.hasOwnProperty(currentLetter)) {   // Ако няма такова пропърти с такава буква 
            letters[currentLetter] = [i];               // Създаваме, масив с дадения индекс 
        } else {                                        // Ако ИМА такова пропърти с такава буква
            letters[currentLetter].push(i);             // към масива до сега добавяме дадения индекс 
        }
    }

    for (let letter in letters) {                       // Минаваме по всяко пропърти от обекта и го печатаме 
        console.log(`${letter}:${letters[letter].join("/")}`);
        // Печатаме свойството и след него, масива с индекси съединен вместо със запетая с наклонена черта 
    }
}
//serializeString(["abababa"])
serializeString(["avjavamsdmcalsdm"]);
