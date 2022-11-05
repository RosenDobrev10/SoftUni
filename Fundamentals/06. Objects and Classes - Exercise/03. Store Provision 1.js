function storeProvision(currentStock, orderedStock) {
    const products = {};
    for (let i = 0; i < currentStock.length; i += 2) {
        let currentProduct = currentStock[i];
        let currentQuantity = Number(currentStock[i + 1]);
        products[currentProduct] = currentQuantity;
    }

    for (let i = 0; i < orderedStock.length; i += 2) {
        let currentProduct = orderedStock[i];
        let currentQuantity = Number(orderedStock[i + 1]);
        products[currentProduct] === undefined ? (products[currentProduct] = 0) : null;
        products[currentProduct] += currentQuantity;
    }
    Object.keys(products).forEach((product) => console.log(`${product} -> ${products[product]}`));
}
