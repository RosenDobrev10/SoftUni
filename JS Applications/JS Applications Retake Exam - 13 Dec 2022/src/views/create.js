import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

// Add @submit=${onSubmit} to form element
const createTemplate = (onSubmit) => html`
	<section id="create">
		<div class="form">
			<h2>Add Product</h2>
			<form @submit=${onSubmit} class="create-form">
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Product Name"
				/>
				<input
					type="text"
					name="imageUrl"
					id="product-image"
					placeholder="Product Image"
				/>
				<input
					type="text"
					name="category"
					id="product-category"
					placeholder="Category"
				/>
				<textarea
					id="product-description"
					name="description"
					placeholder="Description"
					rows="5"
					cols="50"
				></textarea>

				<input
					type="text"
					name="price"
					id="product-price"
					placeholder="Price"
				/>

				<button type="submit">Add</button>
			</form>
		</div>
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
		name: data.name, // PROPERTY NAMES and VALUES WILL BE DIFFERENT !!! Take it from HTML
		imageUrl: data.imageUrl,
		category: data.category,
		description: data.description,
		price: data.price,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/catalog'); // Redirect to some page
}
