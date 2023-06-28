const { createCourse, getById, deleteById, updateById, enrollUser } = require('../services/courseService.js');
const { parseError } = require('../util/parser.js');

const courseController = require('express').Router();

////////////////////////////// CREATE ///////////////////////////////////////
courseController.get('/create', (req, res) => {
	res.render('create', {
        title: 'Create Page',
    });
});

/////////////////////////////// DETAILS ///////////////////////////////////
courseController.get('/:id', async (req, res) => {
    try {
        const course = await getById(req.params.id);    // Зареждаме от сървиса, курса намерен по неговото id 

        course.isOwner = course.owner.toString() == req.user._id.toString();  // Вкарваме в темплейта променлива дали е собственик на курса текущия потребител
        course.enrolled = course.users.map(x => x.toString()).includes(req.user._id.toString())  // Проверяваме дали дадения потребител се е записал за курса

        res.render('details', {                         // Рендим details страницата, като подаваме като контекст курса с неговите данни
            title: 'Details Page',    
            course
        });
    } catch (error) {
        res.render('details', {                      // Рендим същата страница
            title: 'Details Page',                      
			errors: parseError(error),              // Изписваме грешките в съответния нотификейшън параграф
		});
    }
    
});

courseController.post('/create', async (req, res) => {

	const course = {                                // Създаваме обект с данните на курса, които не се създават автоматично
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		duration: req.body.duration,
		owner: req.user._id,
	};

	try {
		await createCourse(course);                 // Създаваме курса като подаваме създадения обект с неговите данни
		res.redirect('/');                          // Ако успеем да го създадем редиректваме към хоум страницата
	} catch (error) {                               // Ако хванем грешка
		res.render('create', {                      // Рендим същата страница
            title: 'Create Page',                      
			errors: parseError(error),              // Изписваме грешките в съответния нотификейшън параграф
            body: req.body
		});
	}
});

////////////////////////////// DELETE ///////////////////////////////////////
courseController.get('/:id/delete', async (req, res) => {
    try {
        const course = await getById(req.params.id);    // Зареждаме от сървиса, курса намерен по неговото id   

        if (course.owner.toString() != req.user._id.toString()){  // Ако потребителя, който се опитва да изтрие не е собственик 
            return res.redirect('/auth/login');     // го препращаме да се логне
        }

        await deleteById(req.params.id);            // Изтриваме курса като подаваме неговото id
        res.redirect('/');                          // Редиректваме към хоум страницата
    } catch (error) {
        res.render('details', {                      // Рендим същата страница
            title: 'Details Page',                      
			errors: parseError(error),              // Изписваме грешките в съответния нотификейшън параграф
		});
    }
    
});

////////////////////////////// EDIT ///////////////////////////////////////
courseController.get('/:id/edit', async (req, res) => {
    try {
        const course = await getById(req.params.id);    // Зареждаме от сървиса, курса намерен по неговото id

        if (course.owner.toString() != req.user._id.toString()){  // Ако потребителя, който се опитва да едитне не е собственик 
            return res.redirect('/auth/login');         // го препращаме да се логне
        }

        res.render('edit', {                            // Рендим едит страницата, като подаваме като контекст курса с неговите данни
            title: 'Edit Page',    
            course
        });
    } catch (error) {
        res.render('edit', {                      // Рендим същата страница
            title: 'Edit Page',                      
			errors: parseError(error),              // Изписваме грешките в съответния нотификейшън параграф
		});
    }
    
});

courseController.post('/:id/edit', async (req, res) => {
    try {
        const course = await getById(req.params.id);    // Зареждаме от сървиса, курса намерен по неговото id

        if (course.owner.toString() != req.user._id.toString()){   // Ако потребителя, който се опитва да едитне не е собственик
            return res.redirect('/auth/login');         // го препращаме да се логне 
        }    
        await updateById(req.params.id, req.body);  // Подаваме на сървиса, id на самия курс и всички данни от формата
        res.redirect(`/course/${req.params.id}`)   // Ако успеем да го едитнем, редиректваме към страницата с детайлите за курса;
    } catch (error) {
        res.render('edit', {
            title: 'Edit Page',    
			errors: parseError(error),
            course: req.body
		});
    }
});

////////////////////////////// ENROLL ///////////////////////////////////////
courseController.get('/:id/enroll', async (req, res) => {
    try {
        const course = await getById(req.params.id);    // Зареждаме от сървиса, курса намерен по неговото id

        if (course.owner.toString() == req.user._id.toString()              // Ако потребителя, който се опитва да се запише за курса е собственик
            || course.users.map(x => x.toString()).includes(req.user._id.toString())){  // Или този потребител вече се е записал за курса 
            return res.redirect(`/course/${req.params.id}`);         // го препращаме към страницата с детайлите за курса 
        }
    
        await enrollUser(req.params.id, req.user._id);              // Иначе го записваме за курса
        return res.redirect(`/course/${req.params.id}`);             // и го препращаме към страницата с детайлите за курса  
    } catch (error) {
        res.render('details', {                      // Рендим същата страница
            title: 'Details Page',                      
			errors: parseError(error),              // Изписваме грешките в съответния нотификейшън параграф
		});
    }
     
});

module.exports = courseController;
