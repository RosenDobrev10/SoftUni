const { isLogged } = require('../middlewares/guards.js');
const { create, getById, updateById, deleteById, wish, profile } = require('../services/bookService.js');
const { parseError } = require('../util/parser.js');

const bookController = require('express').Router();

////////////////////////////////////////////////////// CREATE ////////////////////////////////////////////
bookController.get('/create', isLogged(), (req, res) => {
	res.render('create', {
		title: 'Create Page'
	});
});

bookController.post('/create', isLogged(), async (req, res) => {
	const { title, author, genre, stars, image, review } = req.body;
	const book = {
		title,
		author,
		genre,
		stars: Number(stars),
		image,
		review,
		owner: req.user._id,
	};

	try {
		await create(book);
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
bookController.get('/:id/details', async (req, res) => {
	try {
		const book = await getById(req.params.id);


		book.isOwner = book.owner == req.user?._id;
		book.hasWished = book.wishingList.some(userId => userId == req.user?._id,);
		res.render('details', {
			title: 'Details Page',
			book,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////////////////// EDIT //////////////////////////////////////////////
bookController.get('/:id/edit', isLogged(), async (req, res) => {
	try {
		const book = await getById(req.params.id);

		if (book.owner != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			book,
		});
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

bookController.post('/:id/edit', isLogged(), async (req, res) => {
    const { title, author, genre, stars, image, review } = req.body;

	try {
		const book = await getById(req.params.id);

		if (book.owner != req.user._id) {
			return res.redirect('/404');
		}

        const updatedBook = {
            title,
            author,
            genre,
            stars: Number(stars),
            image,
            review,
        };
		await updateById(req.params.id, updatedBook);
        res.redirect(`/books/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			book: req.body
		});
	}
});

///////////////////////////////////////////////// DELETE //////////////////////////////////////////////
bookController.get('/:id/delete', isLogged(), async (req, res) => {
	try {
		const book = await getById(req.params.id);

		if (book.owner != req.user._id) {
			return res.redirect('/404');
		}

		await deleteById(req.params.id);
        res.redirect('/catalog')
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////////////////// WISH //////////////////////////////////////////////
bookController.get('/:id/wish', isLogged(), async (req, res) => {
	try {
		const book = await getById(req.params.id);

		if (book.owner != req.user._id && book.wishingList.some(userId => userId == req.user._id) == false) {
            await wish(req.params.id, req.user._id);
		}
        
        res.redirect(`/books/${req.params.id}/details`)
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////////////////// PROFILE //////////////////////////////////////////////
bookController.get('/profile', isLogged(), async (req, res) => {
	try {
		const books = await profile(req.user._id);
        res.render('profile', {
			title: 'Profile Page',
            books,
        })
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

module.exports = bookController;
