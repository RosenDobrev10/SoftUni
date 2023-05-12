import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

// Add @submit=${onSubmit} to form element and change variable name
// .value=${album.} to input field
const editTemplate = (album, onSubmit) => html`<section id="edit">
	<div class="form">
		<h2>Edit Album</h2>
		<form @submit=${onSubmit} class="edit-form">
			<input
				type="text"
				name="singer"
				id="album-singer"
				placeholder="Singer/Band"
				.value=${album.singer}
			/>
			<input
				type="text"
				name="album"
				id="album-album"
				placeholder="Album"
				.value=${album.album}
			/>
			<input
				type="text"
				name="imageUrl"
				id="album-img"
				placeholder="Image url"
				.value=${album.imageUrl}
			/>
			<input
				type="text"
				name="release"
				id="album-release"
				placeholder="Release date"
				.value=${album.release}
			/>
			<input
				type="text"
				name="label"
				id="album-label"
				placeholder="Label"
				.value=${album.label}
			/>
			<input
				type="text"
				name="sales"
				id="album-sales"
				placeholder="Sales"
				.value=${album.sales}
			/>

			<button type="submit">post</button>
		</form>
	</div>
</section>`;

export async function editPage(ctx) {
	const id = ctx.params.id;
	const album = await service.getById(id); // Change function name from service and variable name

	ctx.render(editTemplate(album, createSubmitHandler(ctx, onSubmit))); // Change variable name
}

async function onSubmit(ctx, data, event) {
	const id = ctx.params.id;
	// data is object, Object.values(data) return array and we check with "some" if one field is empty it returns true
	if (Object.values(data).some((value) => value === '')) {
		return alert('All fields are required!');
	}

	await service.editById(id, {
		// Change function from service
		singer: data.singer, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		album: data.album,
		imageUrl: data.imageUrl,
		release: data.release,
		label: data.label,
		sales: data.sales,
	});

	event.target.reset();
	ctx.page.redirect('/details/' + id);
}
