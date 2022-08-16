class Restaurant {

    constructor(budget) {
        this.budgetMoney = budget;
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        for (let line of products) {
            let [productName, productQuantity, productTotalPrice] = line.split(" ");
            productQuantity = Number(productQuantity);
            productTotalPrice = Number(productTotalPrice);

            if (productTotalPrice <= this.budgetMoney) {
                this.budgetMoney -= productTotalPrice;
                if (this.stockProducts.hasOwnProperty(productName) === false) {
                    this.stockProducts[productName] = 0;
                }
                this.stockProducts[productName] += productQuantity;
                this.history.push(`Successfully loaded ${productQuantity} ${productName}`);
            } else {
                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`);
            }
        }

        return this.history.join("\n");
    }

    addToMenu(meal, neededProducts, price) {
        let mealObj = { meal, product: [], price };

        for (let line of neededProducts) {
            let [productName, productQuantity] = line.split(" ");
            productQuantity = Number(productQuantity);

            let productObj = { productName, productQuantity };
            mealObj.product.push(productObj);

            if (this.menu.hasOwnProperty(mealObj.meal) === false) {
                this.menu[meal] = mealObj;
                if (Object.keys(this.menu).length === 1) {
                    return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`;
                } else {
                    return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length
                        } meals in the menu, other ideas?`;
                }
            } else {
                return `The ${meal} is already in the our menu, try something different.`;
            }
        }
    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return "Our menu is not ready yet, please come later...";
        } else {
            let result = [];
            Object.entries(this.menu).forEach((meal) =>result.push(`${meal[0]} - $ ${meal[1].price}`));
            return result.join("\n");
        }
    }

    makeTheOrder(meal) {
        let hasAllProducts = true;
        if (Object.keys(this.menu).includes(meal) === false) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        } else {
            for (let product of this.menu[meal].product) {
                if (this.stockProducts.hasOwnProperty(product.productName) === false || this.stockProducts[product.productName] < product.productQuantity) {
                    hasAllProducts = false;
                    break;
                } else {
                    this.stockProducts[product.productName] -= product.productQuantity;
                    this.budgetMoney += this.menu[meal].price;
                }
            }
        }

        if (!hasAllProducts) {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
        } else {
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;
        }
    }
}
let kitchen = new Restaurant(1000);
console.log(
    kitchen.loadProducts([
        "Banana 10 5",
        "Banana 20 10",
        "Strawberries 50 30",
        "Yogurt 10 10",
        "Yogurt 500 1500",
        "Honey 5 50",
    ])
);
console.log(
    kitchen.addToMenu(
        "frozenYogurt",
        ["Yogurt 1", "Honey 1", "Banana 1", "Strawberries 10"],
        9.99
    )
);
console.log(
    kitchen.addToMenu(
        "Pizza",
        [
            "Flour 0.5",
            "Oil 0.2",
            "Yeast 0.5",
            "Salt 0.1",
            "Sugar 0.1",
            "Tomato sauce 0.5",
            "Pepperoni 1",
            "Cheese 1.5",
        ],
        15.55
    )
);
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder("frozenYogurt"));
