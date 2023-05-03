import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as service from '../api/data.js';

const createTemplate = (onSubmit) => html`<section
	id="create-page"
	class="create"
>
	<form @submit=${onSubmit} id="create-form" action="" method="">
		<fieldset>
			<legend>Add new Book</legend>
			<p class="field">
				<label for="title">Title</label>
				<span class="input">
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Title"
					/>
				</span>
			</p>
			<p class="field">
				<label for="description">Description</label>
				<span class="input">
					<textarea
						name="description"
						id="description"
						placeholder="Description"
					></textarea>
				</span>
			</p>
			<p class="field">
				<label for="image">Image</label>
				<span class="input">
					<input
						type="text"
						name="imageUrl"
						id="image"
						placeholder="Image"
					/>
				</span>
			</p>
			<p class="field">
				<label for="type">Type</label>
				<span class="input">
					<select id="type" name="type">
						<option value="Fiction">Fiction</option>
						<option value="Romance">Romance</option>
						<option value="Mistery">Mistery</option>
						<option value="Classic">Clasic</option>
						<option value="Other">Other</option>
					</select>
				</span>
			</p>
			<input class="button submit" type="submit" value="Add Book" />
		</fieldset>
	</form>
</section>`; // Add @submit=${onSubmit} to form element

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
		type: data.type,
	});

	event.target.reset(); // Reset the form
	ctx.page.redirect('/'); // Redirect to some page
}
