const { create, getById, deleteById, updateById, like, getByLikes, getByDate } = require('../services/playService.js');
const { parseError } = require('../util/parser.js');

const playController = require('express').Router();

////////////////////////////// CREATE ///////////////////////////////////////
playController.get('/create', (req, res) => {
	res.render('create', {
        title: 'Create Page',
    });
});

playController.post('/create', async (req, res) => {

	const play = {                                
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
		isPublic: Boolean(req.body.isPublic),
		owner: req.user._id,
	};

	try {
		await create(play);                 
		res.redirect('/');                          
	} catch (error) {                               
		res.render('create', {                      
            title: 'Create Page',                      
			errors: parseError(error),              
            body: req.body
		});
	}
});

/////////////////////////////// DETAILS ///////////////////////////////////
playController.get('/:id/details', async (req, res) => {
    try {
        const play = await getById(req.params.id);    

        play.isOwner = play.owner == req.user._id;  
        play.hasLiked = play.users.some(id => id == req.user._id)  

        res.render('details', {                         
            title: 'Details Page',    
            play
        });
    } catch (error) {
        res.render('details', {                      
            title: 'Details Page',                      
			errors: parseError(error),             
		});
    }
    
});

////////////////////////////// DELETE ///////////////////////////////////////
playController.get('/:id/delete', async (req, res) => {
    try {
        const play = await getById(req.params.id);     

        if (play.owner != req.user._id){   
            return res.redirect('/auth/login');     
        }

        await deleteById(req.params.id);            
        res.redirect('/');                         
    } catch (error) {
        res.render('details', {                      
            title: 'Details Page',                      
			errors: parseError(error),             
		});
    }
    
});

////////////////////////////// EDIT ///////////////////////////////////////
playController.get('/:id/edit', async (req, res) => {
    try {
        const play = await getById(req.params.id);    

        if (play.owner != req.user._id){  
            return res.redirect('/auth/login');        
        }

        res.render('edit', {                            
            title: 'Edit Page',    
            play
        });
    } catch (error) {
        res.render('edit', {                     
            title: 'Edit Page',                      
			errors: parseError(error),              
		});
    }
    
});

playController.post('/:id/edit', async (req, res) => {
    const editedPlay = {                                
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
		isPublic: Boolean(req.body.isPublic),
	};

    try {
        const play = await getById(req.params.id);    

        if (play.owner != req.user._id){   
            return res.redirect('/auth/login');          
        }

        await updateById(req.params.id, editedPlay);  
        res.redirect(`/plays/${req.params.id}/details`)   
    } catch (error) {
        res.render('edit', {
            title: 'Edit Page',    
			errors: parseError(error),
            play: req.body
		});
    }
});

////////////////////////////// LIKE ///////////////////////////////////////
playController.get('/:id/like', async (req, res) => {
    try {
        const play = await getById(req.params.id);    

        if (play.owner != req.user._id && play.users.some(id => id == req.user._id) == false){  
            await like(req.params.id, req.user._id);              
            return res.redirect(`/plays/${req.params.id}/details`);            
        }
    } catch (error) {
        res.render('details', {                      
            title: 'Details Page',                      
			errors: parseError(error),              
		});
    }
     
});

////////////////////////////// SORT BY LIKES ///////////////////////////////////////
playController.get('/sortbylikes', async (req, res) => {
    try {
        const plays = await getByLikes();

        res.render('user-home', {
            title: 'User-Home Page',
            plays,
        });
    } catch (error) {
        res.render('user-home', {
            title: 'User-Home Page',
            errors: parseError(error),
        });
    }
});

////////////////////////////// SORT BY DATE ///////////////////////////////////////
playController.get('/sortbydate', async (req, res) => {
    try {
        const plays = await getByDate();

        res.render('user-home', {
            title: 'User-Home Page',
            plays,
        });
    } catch (error) {
        res.render('user-home', {
            title: 'User-Home Page',
            errors: parseError(error),
        });
    }
});

module.exports = playController;
