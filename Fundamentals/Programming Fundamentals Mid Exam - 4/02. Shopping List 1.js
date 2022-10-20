function shoppingList(arr) {
    let list = arr.shift().split("!");
    while (arr[0] !== "Go Shopping!") {
        let [command, product, newProduct] = arr.shift().split(" ");
        if (command === "Urgent" && !list.includes(product)) {
            list.unshift(product);
        } else if (command === "Unnecessary" && list.includes(product)) {
            list = list.filter((el) => el !== product);
        } else if (command === "Correct" && list.includes(product)) {
            list[list.indexOf(product)] = newProduct;
        } else if (command === "Rearrange" && list.includes(product)) {
            list.splice(list.indexOf(product), 1);
            list.push(product);
        }
    }
    console.log(list.join(", "));
}
