const router = require('express').Router();

const { getList, getById } = require('../services/productService.js');

router.get('/', (req, res) => {
    const products = getList();
    res.render('catalog', {
        products
    });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    const product = getById(id);
    if (product){
        res.render('details', product);
    } else {
        res.render('missingProduct', {
            id
        });
    }
});

module.exports = router;
