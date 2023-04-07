import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

// Add @submit=${onSubmit} to form element
const createTemplate = (onSubmit) => html`
	<section id="createPage">
		<form class="create-form" @submit=${onSubmit}>
			<h1>Create Theater</h1>
			<div>
				<label for="title">Title:</label>
				<input
					id="title"
					name="title"
					type="text"
					placeholder="Theater name"
					value=""
				/>
			</div>
			<div>
				<label for="date">Date:</label>
				<input
					id="date"
					name="date"
					type="text"
					placeholder="Month Day, Year"
				/>
			</div>
			<div>
				<label for="author">Author:</label>
				<input
					id="author"
					name="author"
					type="text"
					placeholder="Author"
				/>
			</div>
			<div>
				<label for="description">Description:</label>
				<textarea
					id="description"
					name="description"
					placeholder="Description"
				></textarea>
			</div>
			<div>
				<label for="imageUrl">Image url:</label>
				<input
					id="imageUrl"
					name="imageUrl"
					type="text"
					placeholder="Image Url"
					value=""
				/>
			</div>
			<button class="btn" type="submit">Submit</button>
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
		date: data.date,
		author: data.author,
		imageUrl: data.imageUrl,
		description: data.description,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
