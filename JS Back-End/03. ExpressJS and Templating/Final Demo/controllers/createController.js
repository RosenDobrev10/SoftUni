const { create } = require('../services/productService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res, next) => {
    try { 
        await create(req.body.name, Number(req.body.price));
    } catch (err) {
        next(err);
    }
    res.redirect('/catalog');
});

module.exports = router;
