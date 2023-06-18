const { Router } = require('express');  // Деструктурираме и изваждаме Router

const router = Router();                // Като го изпълним получава router, подобен на app

router.get('/', (req, res) => {
    res.send('Catalog Page');
});

router.get('/:productId', (req, res) => {           // Когато има посочена част в пътя с : отпред, написаното след това става пропърти в обекта req.params - PATH http://localhost:3000/catalog/123
    console.log(req.params);                        // { productId: '123' }
    console.log(req.params.productId);              // 123, като СТРИНГ !!!
    res.send('Product Details Page');
});

module.exports = router;                        // Правим го публичен, за да може да го ползваме в index.js