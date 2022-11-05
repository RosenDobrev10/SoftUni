class Storage {
    constructor(capacity) {
        this.capacity = capacity;
        this.storage = [];
        this.totalCost = 0;
    }
    addProduct(product) {
        this.capacity -= product.quantity;
        this.totalCost += product.price * product.quantity;
        this.storage.push(product);
    }
    getProducts() {
        return this.storage.map((product) => JSON.stringify(product)).join("\n");
    }
}
