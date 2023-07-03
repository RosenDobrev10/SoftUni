const { isLogged } = require('../middlewares/guards.js');
const { create, getById, updateById, deleteById, bid, getByIdPopulate, getClosed, close } = require('../services/auctionService.js');
const { parseError } = require('../util/parser.js');

const auctionController = require('express').Router();

////////////////////////////////////////////////////// CREATE ////////////////////////////////////////////
auctionController.get('/create', isLogged(), (req, res) => {
	res.render('create', { title: 'Create Page' });
});

auctionController.post('/create', isLogged(), async (req, res) => {
	const { title, category, description, price, image } = req.body;
	const auction = {
		title,
		category,
		description,
		price: Number(price),
		image,
		owner: req.user._id,
	};

	try {
		await create(auction);
		res.redirect('/catalog');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

///////////////////////////////////////////////// DETAILS //////////////////////////////////////////////
auctionController.get('/:id/details', async (req, res) => {
	try {
		const auction = await getByIdPopulate(req.params.id);

		auction.isOwner = auction.owner._id == req.user?._id;
		auction.isBidder = auction.bestBidder[auction.bestBidder.length - 1]?._id == req.user?._id;
		auction.hasBidder = auction.bestBidder.length > 0;
		auction.bestBidder = auction.bestBidder[auction.bestBidder.length - 1]?.firstName + ' ' + auction.bestBidder[auction.bestBidder.length - 1]?.lastName;

		if (auction.isOwner) {
			res.render('details-owner', {
				title: 'Details Page', 
				auction,
			});
		} else {
			res.render('details', {
				title: 'Details Page',
				auction,
			});
		}
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

auctionController.post('/:id/details', async (req, res) => {
	const newBid = Number(req.body.bid);
	let auction; 

	try {
		auction = await getByIdPopulate(req.params.id);

		if (auction.owner._id == req.user?._id) {
			throw new Error('Current user can not place a bid for his auction');
		}

		if (auction.bestBidder == req.user?._id) {
			throw new Error('Current user can not place a bid, because his is the current bidder');
		}

		if (newBid <= auction.price) {
			throw new Error('New bid can not be less than or equal to the current price');
		}

		await bid(req.params.id, newBid, req.user._id);
		res.redirect(`/auctions/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
			newBid,
			auction
		});
	}
});

///////////////////////////////////////////////// EDIT //////////////////////////////////////////////
auctionController.get('/:id/edit', isLogged(), async (req, res) => {
	try {
		const auction = await getById(req.params.id);

		if (auction.owner != req.user._id) {
			return res.redirect('/404');
		}

		auction.hasBidders = auction.bidders != undefined;

		res.render('edit', {
			title: 'Edit Page',
			auction,
		});
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
		});
	}
});

auctionController.post('/:id/edit', isLogged(), async (req, res) => {
	const { title, category, description, price, image } = req.body;

	try {
		const auction = await getById(req.params.id);

		if (auction.owner != req.user._id) {
			return res.redirect('/404');
		}

		const updatedAuction = {
			title,
			category,
			description,
			price: Number(price),
			image,
		};
		await updateById(req.params.id, updatedAuction);
		res.redirect(`/auctions/${req.params.id}/details`);
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			auction: req.body
		});
	}
});

///////////////////////////////////////////////// DELETE //////////////////////////////////////////////
auctionController.get('/:id/delete', isLogged(), async (req, res) => {
	try {
		const auction = await getById(req.params.id);

		if (auction.owner != req.user._id) {
			return res.redirect('/404');
		}

		await deleteById(req.params.id);
		res.redirect('/catalog');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////////////////// PROFILE //////////////////////////////////////////////
auctionController.get('/profile', isLogged(), async (req, res) => {
	try {
		const closed = await getClosed(req.user._id);
		closed.map(c => {
			const lastIndex = c.bestBidder.length - 1;
			c.fullName = c.bestBidder[lastIndex].firstName + ' ' + c.bestBidder[lastIndex].lastName;
		});

		res.render('profile', {
			closed,
			title: 'Profile Page',
		});
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////////////////// CLOSE //////////////////////////////////////////////
auctionController.get('/:id/close', isLogged(), async (req, res) => {
	try {
		await close(req.params.id);
		res.redirect('/auctions/profile');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

module.exports = auctionController;
