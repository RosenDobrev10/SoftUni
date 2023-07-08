const { hasUser } = require('../middlewares/guards.js');
const { create, getAll, getbyId, deletebyId, updatebyId, buy, search} = require('../services/cryptoService.js');
const { parseError } = require('../util/parser.js');

const cryptoController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
cryptoController.get('/create', hasUser(), (req, res) => {
	res.render('create', {
		title: 'Create Page',
	});
});

cryptoController.post('/create', hasUser(), async (req, res) => {
	const crypto = {
		name: req.body.name,
		price: Number(req.body.price),
		imageUrl: req.body.imageUrl,
		description: req.body.description,
		payment: req.body.payment,
		owner: req.user._id,
	};

	try {
		await create(crypto);
		res.redirect('/crypto/catalog');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

///////////////////////////////////// CATALOG //////////////////////////////
cryptoController.get('/catalog', async (req, res) => {
	try {
		const cryptos = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			cryptos,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DETAILS //////////////////////////////
cryptoController.get('/:id/details', async (req, res) => {
	try {
		const crypto = await getbyId(req.params.id);

		crypto.isOwner = crypto.owner.toString() == req.user._id.toString();
		crypto.hasBuy = crypto.buyers.map(x => x.toString()).includes(req.user._id.toString());

		res.render('details', {
			title: 'Details Page',
			crypto,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DELETE //////////////////////////////
cryptoController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
		const crypto = await getbyId(req.params.id);

		if (crypto.owner.toString() != req.user._id.toString()) {
			return res.redirect('/404');
		}

		await deletebyId(req.params.id);
		res.redirect('/crypto/catalog');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// EDIT //////////////////////////////
cryptoController.get('/:id/edit', hasUser(), async (req, res) => {
	try {
		const crypto = await getbyId(req.params.id);

		if (crypto.owner.toString() != req.user._id.toString()) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			crypto,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

cryptoController.post('/:id/edit', hasUser(), async (req, res) => {
	try {
		const crypto = await getbyId(req.params.id);
        
		if (crypto.owner.toString() != req.user._id.toString()) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, req.body);
        res.redirect(`/crypto/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			crypto: req.body,
		});
	}
});

///////////////////////////////////// BUY //////////////////////////////
cryptoController.get('/:id/buy', hasUser(), async (req, res) => {
	try {
		const crypto = await getbyId(req.params.id);

		if (crypto.owner.toString() == req.user._id.toString() || crypto.buyers.map(x => x.toString()).includes(req.user._id.toString())){   
        	return res.redirect(`/crypto/${req.params.id}/details`);         
    	}

		await buy(req.params.id, req.user._id);
		res.redirect(`/crypto/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// SEARCH //////////////////////////////
cryptoController.get('/search', hasUser(), async (req, res) => {
	try {
		const cryptos = await search(req.query.name, req.query.payment);
		res.render('search', {
			title: 'Search Page',
			cryptos,
			nameSearch: req.query.name,
			paymentSearch: req.query.payment,
		});
	} catch (error) {
		res.render('search', {
			title: 'Search Page',
			errors: parseError(error),
			nameSearch: req.query.name,
			paymentSearch: req.query.payment,
		});
	}
});

module.exports = cryptoController;
