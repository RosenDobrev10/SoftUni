function legendaryFarming(input){

    let junk = {}       // Правим обект, в който ще пазим ненужните материали 
    let keyMaterials = { "shards" : 0, "fragments" : 0, "motes" : 0 }   // Правим обек с трите важни материали с начална стойност 0
    let legendaryItem = ""      // Правим празен стринг, за легендарния предмет, щом съберем достатъчно материали 

    input = input.split(" ")    // инпута е стринг и го правим на масив по разстояние 

    for (let i = 0; i < input.length; i += 2){  // Минаваме през 2, за да взимаме двойките количество и материал 
        let quantity = Number(input[i])         // на нулевия индекс, стои количеството и го правим на число 
        let material = input[i + 1].toLowerCase()   // на първи индекс е материала, правим го малки букви като в обекта 
        if (material === "shards" || material === "fragments" || material === "motes"){ // Ако материала е един от трите важни 
            keyMaterials[material] += quantity                              // увеличаваме количеството му 
            if (keyMaterials[material] >= 250 && material === "shards"){   // Ако стигне 250 или повече 
                legendaryItem = "Shadowmourne"                              // слагаме тази стойност за легендарен предмет 
                keyMaterials[material] -= 250                               // от количеството вадим 250, за да го създадем 
                break;                                                      // прекъсваме и не търсим повече и взимаме материали 
            } else if (keyMaterials[material] >= 250 && material === "fragments"){  // Ако стигне 250 или повече
                legendaryItem = "Valanyr"                                   // слагаме тази стойност за легендарен предмет
                keyMaterials[material] -= 250                               // от количеството вадим 250, за да го създадем
                break;                                                      // прекъсваме и не търсим повече и взимаме материали 
            } else if (keyMaterials[material] >= 250 && material === "motes"){  // Ако стигне 250 или повече
                legendaryItem = "Dragonwrath"                               // слагаме тази стойност за легендарен предмет
                keyMaterials[material] -= 250                               // от количеството вадим 250, за да го създадем
                break;                                                      // прекъсваме и не търсим повече и взимаме материали         
            } 
        } else {                                    // Ако материала НЕ е един от трите важни, а е Junk 
            if (!junk.hasOwnProperty(material)){    // Проверяваме дали имаме такъв материал вече, ако нямаме 
                junk[material] = 0                  // го създаваме с начална стойност 0 
            }
            junk[material] += quantity              // Независимо дали го имаме или не, добавяме към него количеството
        }  
    }

    console.log(`${legendaryItem} obtained!`)       // Отпечатваме какъв е предмета, който сме придобили

    let sortedKeyMaterials = Object.entries(keyMaterials).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    // Сортираме важните материали по количество в низходящ ред, ако имат равно количество по азбучен ред 
    let sortedJunk = Object.entries(junk).sort((a, b) => a[0].localeCompare(b[0]))
    // Сортираме junk материалите по азбучен ред само 
    
    for (let [material, quantity] of sortedKeyMaterials) {  // Минаваме по важните материали вече сортирани
        console.log(`${material}: ${quantity}`);            // Печатаме, материала и количеството
    }

    for (let [material, quantity] of sortedJunk) {          // Минаваме по junk материалите вече сортирани 
        console.log(`${material}: ${quantity}`);            // Печатаме, материала и количеството
    }
    
}
legendaryFarming('123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver')