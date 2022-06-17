function shoppingList(input) {

    let list = input.shift().split("!")

    while (input[0] !== "Go Shopping!"){

        let [command, item,newItem] = input.shift().split(" ")
        let indexItem = list.indexOf(item)

        switch(command){
            case "Urgent":
                if (!list.includes(item)){
                    list.unshift(item)
                }
                break;
            case "Unnecessary":
                if (list.includes(item)){
                    list.splice(indexItem, 1)
                }
                break;
            case "Correct":
                if (list.includes(item)){
                   list[indexItem] = newItem
                }
                break;
            case "Rearrange":
                if (list.includes(item)){
                    list.splice(indexItem, 1)
                    list.push(item)
                }
                break;
        }
    }
    console.log(list.join(", "))
}
//shoppingList(["Tomatoes!Potatoes!Bread","Unnecessary Milk","Urgent Tomatoes","Go Shopping!",]);
shoppingList(["Milk!Pepper!Salt!Water!Banana","Urgent Salt","Unnecessary Grapes","Correct Pepper Onion","Rearrange Grapes","Correct Tomatoes Potatoes","Go Shopping!",]);
