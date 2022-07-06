let data = [
    {
    id:'0001',
    name: 'Oil filter'
    },

    {
    id:'0002',
    name: 'Windshield wiper'
    },

    {
    id:'0003',
    name: 'Xenon headlight'
    },

    {
    id:'0004',
    name: 'Spoiler'
    },

]

module.exports = {
    catalog: (req, res) => {
        res.render('catalog',{products: data})
    },
    details: (req, res) => {
        console.log(req.params.productId)
        let product = data[req.params.productId]
        res.send(`<h1>Product details</h1>
        <a href= "/catalog">Back to Catalog</a>
        <p>Information about Product 1</p>
        <p>${product}</p>`)
    }

}