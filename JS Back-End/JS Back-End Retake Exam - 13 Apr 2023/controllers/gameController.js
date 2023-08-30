const { hasUser } = require('../middlewares/guards.js');
const { create, getAll, getbyId, deleteById, updatebyId, buy, search,} = require('../services/gameService.js');
const { parseError } = require('../util/parser.js');

const gameController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
gameController.get('/create', hasUser(), (req, res) => {
	res.render('create', {
		title: 'Create Page'
	});
});

gameController.post('/create', hasUser(), async (req, res) => {
	const game = {
		name: req.body.name,
		price: Number(req.body.price),
		imageUrl: req.body.imageUrl,
		description: req.body.description,
		platform: req.body.platform,
		genre: req.body.genre,
		owner: req.user._id,
	};

	try {
		await create(game);
		res.redirect('/game/catalog');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

///////////////////////////////////// CATALOG //////////////////////////////
gameController.get('/catalog', async (req, res) => {
	try {
		const games = await getAll();
		res.render('catalog', {
			title: 'Catalog Page',
			games,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DETAILS //////////////////////////////
gameController.get('/:id/details', async (req, res) => {
	try {
		const game = await getbyId(req.params.id);

		game.isOwner = game.owner.toString() == req.user._id.toString();
		game.hasBought = game.buyers.map(x => x.toString()).includes(req.user._id.toString());

		res.render('details', {
			title: 'Details Page',
			game,
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DELETE //////////////////////////////
gameController.get('/:id/delete', hasUser(), async (req, res) => {
	try {
		const game = await getbyId(req.params.id);

		if (game.owner.toString() != req.user._id.toString()) {
			return res.redirect('/404');
		}

		await deleteById(req.params.id);
		res.redirect('/game/catalog');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// EDIT //////////////////////////////
gameController.get('/:id/edit', hasUser(), async (req, res) => {
	try {
		const game = await getbyId(req.params.id);

		if (game.owner.toString() != req.user._id.toString()) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			game,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

gameController.post('/:id/edit', hasUser(), async (req, res) => {
	try {
		const game = await getbyId(req.params.id);
        
		if (game.owner.toString() != req.user._id.toString()) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, req.body);
        res.redirect(`/game/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			game: req.body
		});
	}
});

///////////////////////////////////// BUY //////////////////////////////
gameController.get('/:id/buy', hasUser(), async (req, res) => {
	try {
		const game = await getbyId(req.params.id);

		if (game.owner.toString() == req.user._id.toString() || game.buyers.map(x => x.toString()).includes(req.user._id.toString())){   
        	return res.redirect(`/game/${req.params.id}/details`);         
    	}

		await buy(req.params.id, req.user._id);
		res.redirect(`/game/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// SEARCH //////////////////////////////
gameController.get('/search', hasUser(), async (req, res) => {
	try {
		const games = await search(req.query.name, req.query.platform);
		res.render('search', {
			title: 'Search Page',
			games,
			nameSearch: req.query.name,
			platformSearch: req.query.platform
		});
	} catch (error) {
		res.render('search', {
			title: 'Search Page',
			errors: parseError(error),
			nameSearch: req.query.name,
			platformSearch: req.query.platform	
		});
	}
});

module.exports = gameController;
