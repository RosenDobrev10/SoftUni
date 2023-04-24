import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

// Add @submit=${onSubmit} to form element and change variable name
// .value=${item.} to input field
const editTemplate = (item, onSubmit) => html`
	<section id="edit">
		<div class="form">
			<h2>Edit Product</h2>
			<form @submit=${onSubmit} class="edit-form">
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Product Name"
					.value=${item.name}
				/>
				<input
					type="text"
					name="imageUrl"
					id="product-image"
					placeholder="Product Image"
					.value=${item.imageUrl}
				/>
				<input
					type="text"
					name="category"
					id="product-category"
					placeholder="Category"
					.value=${item.category}
				/>
				<textarea
					id="product-description"
					name="description"
					placeholder="Description"
					rows="5"
					cols="50"
					.value=${item.description}
				></textarea>
				<input
					type="text"
					name="price"
					id="product-price"
					placeholder="Price"
					.value=${item.price}
				/>
				<button type="submit">post</button>
			</form>
		</div>
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
		name: data.name, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		imageUrl: data.imageUrl,
		category: data.category,
		description: data.description,
		price: data.price,
	});

	event.target.reset();
	ctx.page.redirect('/details/' + id);
}
