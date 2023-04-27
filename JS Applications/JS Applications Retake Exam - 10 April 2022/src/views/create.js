import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

// Add @submit=${onSubmit} to form element
const createTemplate = (onSubmit) => html`
	<section id="create-page" class="auth">
		<form id="create" @submit=${onSubmit}>
			<h1 class="title">Create Post</h1>

			<article class="input-group">
				<label for="title">Post Title</label>
				<input type="title" name="title" id="title" />
			</article>

			<article class="input-group">
				<label for="description">Description of the needs </label>
				<input type="text" name="description" id="description" />
			</article>

			<article class="input-group">
				<label for="imageUrl"> Needed materials image </label>
				<input type="text" name="imageUrl" id="imageUrl" />
			</article>

			<article class="input-group">
				<label for="address">Address of the orphanage</label>
				<input type="text" name="address" id="address" />
			</article>

			<article class="input-group">
				<label for="phone">Phone number of orphanage employee</label>
				<input type="text" name="phone" id="phone" />
			</article>

			<input type="submit" class="btn submit" value="Create Post" />
		</form>
	</section>
`;

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
		title: data.title, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		description: data.description,
		imageUrl: data.imageUrl,
		address: data.address,
		phone: data.phone,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
