let express = require('express')
let handlerbars = require('express-handlebars').create

let catalogController = require('./controllers/catalogController')

let app = express()

app.engine('.hbs', handlerbars({
    extname: '.hbs',
}).engine)
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
    res.render(`home`)
})

app.get('/catalog', catalogController.catalog )

app.get('/catalog/:productId', catalogController.details )

app.listen(3000, () => console.log('Server listening on port 3000....'))