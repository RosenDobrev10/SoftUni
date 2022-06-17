function gladiatorInventory(array) {

    let inventory = array.shift().split(" ");  // Взимаме първия елемент и го делим по разстояние да намерим неговия инвентар
    let commands = array.toString().split(","); // Останалата част от масива я делим по запетая за да вземем командите 

    for (let i = 0; i < commands.length; i++) {      // Правим цикъл да минем по всички команди 
        let currentCommand = commands[i].split(" "); // Всяка команда я делим по интервал за отделните и елементи 
        let toDo = currentCommand[0];                // На нулев индекс винаги е, това което трябва да направим 
        let equipment = currentCommand[1];           // На първи индекс е екипировката към дадената команда 

        switch (toDo) {                             // Минаваме по задачите от командите 
            case "Buy":
                if (!inventory.includes(equipment)) {   // Ако в инвентара му няма дадената екипировка
                    inventory.push(equipment);          // я добавяме в края на инвентара му 
                }
                break;

            case "Trash":
                let positionEquipmentTrash = inventory.indexOf(equipment);  // намираме индекса, на който се намира екипировката
                if (positionEquipmentTrash !== -1) {                // Ако намерим екипировка на даден индекс 
                    inventory.splice(positionEquipmentTrash, 1);    // изтриваме я от този индекс 
                }
                break;

            case "Repair":
                let positionEquipmentRepair = inventory.indexOf(equipment); // намираме индекса, на който се намира екипировката
                if (positionEquipmentRepair !== -1) {               // Ако намерим екипировка на даден индекс 
                    inventory.splice(positionEquipmentRepair, 1);   // изтриваме я от този индекс
                    inventory.push(equipment);                      // и я слагаме в края като поправена 
                }
                break;

            case "Upgrade":
                let upgraded = equipment.toString().split("-");     // разделяме по интервал самата екипировка 
                let upgradedEquipment = upgraded[0];                // на нулев индекс е самата екипировка 
                let upgrade = upgraded[1];                          // на първи индекс е самият ъпгрейд
                let positionEquipmentUpgrade = inventory.indexOf(upgradedEquipment); // намираме индекса, на който се намира екипировката
                if (positionEquipmentUpgrade !== -1) {              // Ако намерим екипировка на даден индекс 
                    inventory.splice(positionEquipmentUpgrade + 1, 0, `${upgradedEquipment}:${upgrade}`);   // след индекса на който сме я намерили, добавяме екипировката и нейния ъпгрейд 
                }
                break;
        }
    }
    console.log(inventory.join(" "));
}
//gladiatorInventory(['SWORD Shield Spear','Buy Bag','Trash Shield','Repair Spear','Upgrade SWORD-Steel'])
gladiatorInventory(["SWORD Shield Spear","Trash Bow","Repair Shield","Upgrade Helmet-V",]);
