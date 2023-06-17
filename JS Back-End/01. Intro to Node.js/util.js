function html(body, title = 'Demo site') {
	return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <nav>
        <ul>
        <li><a href="/">Home</a>
        <li><a href="/catalog">Catalog</a>
        <li><a href="/create">Create</a>
        <li><a href="/about">About</a>
        </ul>
    </nav>
    ${body}
</body>
</html>
    `;
}

const data = [
    {
        id: 'asdf0001',
        name: 'Product 1',
        color: 'Red'
    },
    {
        id: 'asdf0002',
        name: 'Product 2',
        color: 'Green'
    },
]


module.exports = { 
    html,
    data
 };
