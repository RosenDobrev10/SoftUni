import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

// Add @submit=${onSubmit} to form element and change variable name
const editTemplate = (pet, onSubmit) => html`<section id="editPage">
	<form @submit=${onSubmit} class="editForm">
		<img src="./images/editpage-dog.jpg" />
		<div>
			<h2>Edit PetPal</h2>
			<div class="name">
				<label for="name">Name:</label>
				<input name="name" id="name" type="text" .value=${pet.name} />
			</div>
			<div class="breed">
				<label for="breed">Breed:</label>
				<input
					name="breed"
					id="breed"
					type="text"
					.value=${pet.breed}
				/>
			</div>
			<div class="Age">
				<label for="age">Age:</label>
				<input name="age" id="age" type="text" .value=${pet.age} />
			</div>
			<div class="weight">
				<label for="weight">Weight:</label>
				<input
					name="weight"
					id="weight"
					type="text"
					.value=${pet.weight}
				/>
			</div>
			<div class="image">
				<label for="image">Image:</label>
				<input
					name="image"
					id="image"
					type="text"
					.value=${pet.image}
				/>
			</div>
			<button class="btn" type="submit">Edit Pet</button>
		</div>
	</form>
</section>`;

export async function editPage(ctx) {
	const id = ctx.params.id;
	const pet = await service.getById(id); // Change function name from service and variable name

	ctx.render(editTemplate(pet, createSubmitHandler(ctx, onSubmit))); // Change variable name
}

async function onSubmit(ctx, data, event) {
	const id = ctx.params.id;
	// data is object, Object.values(data) return array and we check with "some" if one field is empty it returns true
	if (Object.values(data).some((value) => value === '')) {
		return alert('All fields are required!');
	}

	await service.editById(id, {
		// Change function name from service
		name: data.name, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		breed: data.breed,
		age: data.age,
		weight: data.weight,
		image: data.image,
	});

	event.target.reset();
	ctx.page.redirect('/details/' + id);
}
