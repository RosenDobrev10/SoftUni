const { html, data } = require('../util.js');
const { IncomingForm } = require('formidable')

function catalogPage(req, res) {
    res.write(html(`
    <h1>Catalog page</h1>
    <p>List Items!</p>
    <ul>
        ${data.map(i => `<li data-id=${i.id}>${i.name} - ${i.color}</li>`).join('\n')}
    </ul>`, 'Catalog'));
    res.end();
}

function createPage(req, res){
    res.write(html(`
    <h1>Create Item</h1>
    <form method="POST" action="/create">
        <label>Name: <input type="text" name="name"></label>
        <label>Color: <select name="color">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </select
        </label>
        <input type="submit" value="Create">
    </form>`, 'Create New Item'));
    res.end();
}

function createItem(req, res){
    console.log('create request');
    const form = new IncomingForm();
    form.parse(req, (err, fields) => {
        const item = {
            id: 'asdf' + ('0000' + (Math.random() * 9999 | 0)).slice(-4),
            name: fields.name,
            color: fields.color,
        };

        data.push(item);

        res.writeHead(301, [
            'Location',
            '/catalog'
        ]);
        res.end();
    });

}

module.exports = {
    catalogPage,
    createPage,
    createItem,
}