const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about', {
        title:'About Us'
    })
});



module.exports = router