import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

const createTemplate = (onSubmit) => html`<section id="createPage">
	<form @submit=${onSubmit} class="createForm">
		<img src="./images/cat-create.jpg" />
		<div>
			<h2>Create PetPal</h2>
			<div class="name">
				<label for="name">Name:</label>
				<input name="name" id="name" type="text" placeholder="Max" />
			</div>
			<div class="breed">
				<label for="breed">Breed:</label>
				<input
					name="breed"
					id="breed"
					type="text"
					placeholder="Shiba Inu"
				/>
			</div>
			<div class="Age">
				<label for="age">Age:</label>
				<input name="age" id="age" type="text" placeholder="2 years" />
			</div>
			<div class="weight">
				<label for="weight">Weight:</label>
				<input
					name="weight"
					id="weight"
					type="text"
					placeholder="5kg"
				/>
			</div>
			<div class="image">
				<label for="image">Image:</label>
				<input
					name="image"
					id="image"
					type="text"
					placeholder="./image/dog.jpeg"
				/>
			</div>
			<button class="btn" type="submit">Create Pet</button>
		</div>
	</form>
</section>`; // Add @submit=${onSubmit} to form element

export function createPage(ctx) {
	ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
	// data is object, Object.values(data) return array and we check with "some" if one field is empty it returns true
	if (Object.values(data).some((value) => value === '')) {
		// Validation if there is any in WORD FILE
		return alert('All fields are required!');
	}

	await service.create({
		// Change function from service
		name: data.name, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		breed: data.breed,
		age: data.age,
		weight: data.weight,
		image: data.image,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
