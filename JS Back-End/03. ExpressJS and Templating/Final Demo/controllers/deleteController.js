const { getById, deleteById } = require('../services/productService.js');

const router = require('express').Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const product = getById(id);
    res.render('delete', product);
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    await deleteById(id);
    res.redirect('/catalog');
});

module.exports = router;