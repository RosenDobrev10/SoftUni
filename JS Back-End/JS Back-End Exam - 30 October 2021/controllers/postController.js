const { hasUser } = require('../middlewares/guards.js');
const { create, getbyId, deletebyId, updatebyId, myPosts, upvote, downvote, vote} = require('../services/postService.js');
const { parseError } = require('../util/parser.js');

const postController = require('express').Router();

///////////////////////////////////// CREATE //////////////////////////////
postController.get('/create', hasUser(), (req, res) => {
	res.render('create', {
		title: 'Create Page',
	});
});

postController.post('/create', hasUser(), async (req, res) => {

	const post = {
		title: req.body.title,
		keyword: req.body.keyword,
		location: req.body.location,
		date: req.body.date,
		image: req.body.image,
		description: req.body.description,
		owner: req.user._id,
	};

	try {
		await create(post);
		res.redirect('/catalog');
	} catch (error) {
		res.render('create', {
			title: 'Create Page',
			errors: parseError(error),
			body: req.body,
		});
	}
});


///////////////////////////////////// DETAILS //////////////////////////////
postController.get('/:id/details', async (req, res) => {

	try {
		const post = await getbyId(req.params.id);

		post.isOwner = post.owner._id == req.user?._id;
		post.hasVoted = post.voters.some(id => id._id == req.user?._id);
		post.hasVoters = post.voters.length > 0 ;
		post.votersEmails = post.voters.map(voter => voter.email).join(', ');
		console.log(post);

		res.render('details', {
			post,
			title: 'Details Page',
		});
	} catch (error) {
		res.render('catalog', {
			title: 'Catalog Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DELETE //////////////////////////////
postController.get('/:id/delete', hasUser(), async (req, res) => {

	try {
		const post = await getbyId(req.params.id);

		if (post.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		await deletebyId(req.params.id);
		res.redirect('/catalog');
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// EDIT //////////////////////////////
postController.get('/:id/edit', hasUser(), async (req, res) => {

	try {
		const post = await getbyId(req.params.id);

		if (post.owner._id != req.user._id) {
			return res.redirect('/404');
		}

		res.render('edit', {
			title: 'Edit Page',
			post,
		});
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
		});
	}
});

postController.post('/:id/edit', hasUser(), async (req, res) => {

	const editedPost = {
		title: req.body.title,
		keyword: req.body.keyword,
		location: req.body.location,
		date: req.body.date,
		image: req.body.image,
		description: req.body.description,
	};

	try {
		const post = await getbyId(req.params.id);
        
		if (post.owner._id != req.user._id) {
			return res.redirect('/404');
		}

        await updatebyId(req.params.id, editedPost);
        res.redirect(`/posts/${req.params.id}/details`)
	} catch (error) {
		res.render('edit', {
			title: 'Edit Page',
			errors: parseError(error),
			post: req.body
		});
	}
});

///////////////////////////////////// UPVOTE //////////////////////////////
postController.get('/:id/upvote', hasUser(), async (req, res) => {

	try {
		const post = await getbyId(req.params.id);

		if (post.owner._id != req.user._id && post.voters.some(id => id == req.user._id) == false){   
			await upvote(req.params.id, req.user._id);
    	}

		res.redirect(`/posts/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// DOWNVOTE //////////////////////////////
postController.get('/:id/downvote', hasUser(), async (req, res) => {

	try {
		const post = await getbyId(req.params.id);

		if (post.owner._id != req.user._id && post.voters.some(id => id == req.user._id) == false){   
			await downvote(req.params.id, req.user._id);
    	}

		res.redirect(`/posts/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// VOTE //////////////////////////////
postController.get('/:id/vote', hasUser(), async (req, res) => {
	const voteValue = Number(req.query.vote)

	try {
		const post = await getbyId(req.params.id);

		if (post.owner._id != req.user._id && post.voters.some(id => id == req.user._id) == false){   
			await vote(req.params.id, req.user._id, voteValue);
    	}

		res.redirect(`/posts/${req.params.id}/details`);
	} catch (error) {
		res.render('details', {
			title: 'Details Page',
			errors: parseError(error),
		});
	}
});

///////////////////////////////////// PROFILE //////////////////////////////
postController.get('/profile', hasUser(), async (req, res) => {

	try {
		const posts = await myPosts(req.user._id);
		// const sharedPublications = (await getSharedPublications(req.user._id)).map(publication => publication.title).join(', ');		
		// const createdPublications = (await myPublications(req.user._id)).map(publication => publication.title).join(', ');
		console.log(posts)
		res.render('profile', {
			title: 'Profile Page',
			posts,
		});
	} catch (error) {
		res.render('profile', {
			title: 'Profile Page',
			errors: parseError(error),
		});
	}
});

module.exports = postController;
