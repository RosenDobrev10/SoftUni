import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

// Add @submit=${onSubmit} to form element and change variable name
// .value=${item.} to input field
const editTemplate = (item, onSubmit) => html`
	<section id="edit-page" class="auth">
		<form id="edit" @submit=${onSubmit}>
			<h1 class="title">Edit Post</h1>

			<article class="input-group">
				<label for="title">Post Title</label>
				<input
					type="title"
					name="title"
					id="title"
					.value=${item.title}
				/>
			</article>

			<article class="input-group">
				<label for="description">Description of the needs </label>
				<input
					type="text"
					name="description"
					id="description"
					.value=${item.description}
				/>
			</article>

			<article class="input-group">
				<label for="imageUrl"> Needed materials image </label>
				<input
					type="text"
					name="imageUrl"
					id="imageUrl"
					.value=${item.imageUrl}
				/>
			</article>

			<article class="input-group">
				<label for="address">Address of the orphanage</label>
				<input
					type="text"
					name="address"
					id="address"
					.value=${item.address}
				/>
			</article>

			<article class="input-group">
				<label for="phone">Phone number of orphanage employee</label>
				<input
					type="text"
					name="phone"
					id="phone"
					.value=${item.phone}
				/>
			</article>

			<input type="submit" class="btn submit" value="Edit Post" />
		</form>
	</section>
`;

export async function editPage(ctx) {
	const id = ctx.params.id;
	const item = await service.getById(id); // Change function name from service and variable name

	ctx.render(editTemplate(item, createSubmitHandler(ctx, onSubmit))); // Change variable name
}

async function onSubmit(ctx, data, event) {
	const id = ctx.params.id;
	// data is object, Object.values(data) return array and we check with "some" if one field is empty it returns true
	if (Object.values(data).some((value) => value === '')) {
		return alert('All fields are required!');
	}

	await service.editById(id, {
		// Change function from service
		title: data.title, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		description: data.description,
		imageUrl: data.imageUrl,
		address: data.address,
		phone: data.phone,
	});

	event.target.reset();
	ctx.page.redirect('/details/' + id);
}
