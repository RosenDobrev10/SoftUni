import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

// Add @submit=${onSubmit} to form element
const createTemplate = (onSubmit) => html`<section id="create">
	<div class="form">
		<h2>Add Album</h2>
		<form @submit=${onSubmit} class="create-form">
			<input
				type="text"
				name="singer"
				id="album-singer"
				placeholder="Singer/Band"
			/>
			<input
				type="text"
				name="album"
				id="album-album"
				placeholder="Album"
			/>
			<input
				type="text"
				name="imageUrl"
				id="album-img"
				placeholder="Image url"
			/>
			<input
				type="text"
				name="release"
				id="album-release"
				placeholder="Release date"
			/>
			<input
				type="text"
				name="label"
				id="album-label"
				placeholder="Label"
			/>
			<input
				type="text"
				name="sales"
				id="album-sales"
				placeholder="Sales"
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
		singer: data.singer, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		album: data.album,
		imageUrl: data.imageUrl,
		release: data.release,
		label: data.label,
		sales: data.sales,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/catalog'); // Redirect to some page
}
