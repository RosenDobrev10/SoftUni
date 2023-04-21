import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

// Add @submit=${onSubmit} to form element and change variable name
// .value=${shoe.} to input field
const editTemplate = (shoe, onSubmit) => html`<section id="edit">
	<div class="form">
		<h2>Edit item</h2>
		<form @submit=${onSubmit} class="edit-form">
			<input
				type="text"
				name="brand"
				id="shoe-brand"
				placeholder="Brand"
				.value=${shoe.brand}
			/>
			<input
				type="text"
				name="model"
				id="shoe-model"
				placeholder="Model"
				.value=${shoe.model}
			/>
			<input
				type="text"
				name="imageUrl"
				id="shoe-img"
				placeholder="Image url"
				.value=${shoe.imageUrl}
			/>
			<input
				type="text"
				name="release"
				id="shoe-release"
				placeholder="Release date"
				.value=${shoe.release}
			/>
			<input
				type="text"
				name="designer"
				id="shoe-designer"
				placeholder="Designer"
				.value=${shoe.designer}
			/>
			<input
				type="text"
				name="value"
				id="shoe-value"
				placeholder="Value"
				.value=${shoe.value}
			/>

			<button type="submit">post</button>
		</form>
	</div>
</section>`;

export async function editPage(ctx) {
	const id = ctx.params.id;
	const shoe = await service.getById(id); // Change function name from service and variable name

	ctx.render(editTemplate(shoe, createSubmitHandler(ctx, onSubmit))); // Change variable name
}

async function onSubmit(ctx, data, event) {
	const id = ctx.params.id;
	// data is object, Object.values(data) return array and we check with "some" if one field is empty it returns true
	if (Object.values(data).some((value) => value === '')) {
		return alert('All fields are required!');
	}

	await service.editById(id, {
		// Change function from service
		brand: data.brand, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		model: data.model,
		imageUrl: data.imageUrl,
		release: data.release,
		designer: data.designer,
		value: data.value,
	});

	event.target.reset();
	ctx.page.redirect('/details/' + id);
}
