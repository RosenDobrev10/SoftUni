function shoppingList(input) {

    let list = input.shift().split("!")     // Взимаме списъка с покупки и го делим по ! 

    while (input[0] !== "Go Shopping!"){    // Докато не дойде командата да пазаруваме въртим цикъла и поправяме списъка 

        let [command, item,newItem] = input.shift().split(" ")  // Създаваме си три променливи като от инпута взимаме стойност и я делим по интервал 
        let indexItem = list.indexOf(item)                      // Намираме индекса, на който се намира продукта 

        switch(command){
            case "Urgent":
                if (!list.includes(item)){      // Ако го няма в списъка 
                    list.unshift(item)          // Го добавяме на първо място 
                }
                break;
            case "Unnecessary":
                if (list.includes(item)){       // Ако го има в списъка
                    list.splice(indexItem, 1)   // го изтриваме от мястото където е
                }
                break;
            case "Correct":
                if (list.includes(item)){       // Ако го има в списъка
                   list[indexItem] = newItem    // го заменяме с нов продукт на мястото където е
                }
                break;
            case "Rearrange":
                if (list.includes(item)){       // Ако го има в списъка
                    list.splice(indexItem, 1)   // го итриваме от мястото където е
                    list.push(item)             // и го слагаме в края на списъка 
                }
                break;
        }
    }
    console.log(list.join(", "))
}
//shoppingList(["Tomatoes!Potatoes!Bread","Unnecessary Milk","Urgent Tomatoes","Go Shopping!",]);
shoppingList(["Milk!Pepper!Salt!Water!Banana","Urgent Salt","Unnecessary Grapes","Correct Pepper Onion","Rearrange Grapes","Correct Tomatoes Potatoes","Go Shopping!",]);
