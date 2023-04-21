import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

// Add @submit=${onSubmit} to form element
const createTemplate = (onSubmit) => html`<section id="create">
	<div class="form">
		<h2>Add item</h2>
		<form @submit=${onSubmit} class="create-form">
			<input
				type="text"
				name="brand"
				id="shoe-brand"
				placeholder="Brand"
			/>
			<input
				type="text"
				name="model"
				id="shoe-model"
				placeholder="Model"
			/>
			<input
				type="text"
				name="imageUrl"
				id="shoe-img"
				placeholder="Image url"
			/>
			<input
				type="text"
				name="release"
				id="shoe-release"
				placeholder="Release date"
			/>
			<input
				type="text"
				name="designer"
				id="shoe-designer"
				placeholder="Designer"
			/>
			<input
				type="text"
				name="value"
				id="shoe-value"
				placeholder="Value"
			/>

			<button type="submit">post</button>
		</form>
	</div>
</section>`;

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
		brand: data.brand, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		model: data.model,
		imageUrl: data.imageUrl,
		release: data.release,
		designer: data.designer,
		value: data.value,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/catalog'); // Redirect to some page
}
