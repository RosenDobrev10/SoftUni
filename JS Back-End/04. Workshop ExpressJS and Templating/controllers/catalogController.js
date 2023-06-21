const { getAll, getById } = require('../service/accomodationService.js');

const router = require('express').Router();

router.get('/', (req, res) => {
    const rooms = getAll()
    res.render('catalog', {
        title: 'All Accomodation',
        rooms
    });
});

router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const room = getById(roomId)
    if (room){
        res.render('details', {
            title: 'Accomodation details',
            room
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accomodation details',
            roomId
        });
    }
    
})

module.exports = router