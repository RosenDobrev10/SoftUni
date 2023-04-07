import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

// Add @submit=${onSubmit} to form element and change variable name
// .value=${item.} to input field
const editTemplate = (item, onSubmit) => html`
	<section id="editPage">
		<form class="theater-form" @submit=${onSubmit}>
			<h1>Edit Theater</h1>
			<div>
				<label for="title">Title:</label>
				<input
					id="title"
					name="title"
					type="text"
					placeholder="Theater name"
					.value=${item.title}
				/>
			</div>
			<div>
				<label for="date">Date:</label>
				<input
					id="date"
					name="date"
					type="text"
					placeholder="Month Day, Year"
					.value=${item.date}
				/>
			</div>
			<div>
				<label for="author">Author:</label>
				<input
					id="author"
					name="author"
					type="text"
					placeholder="Author"
					.value=${item.author}
				/>
			</div>
			<div>
				<label for="description">Theater Description:</label>
				<textarea
					id="description"
					name="description"
					placeholder="Description"
					.value=${item.description}
				>
To Kill a Mockingbird is a 2018 play based on the 1960 novel of the same name by Harper Lee, adapted for the stage by Aaron Sorkin. It opened on Broadway at the Shubert Theatre on December 13, 2018. The play is set to transfer to London's West End at the Gielgud Theatre in March 2022.</textarea
				>
			</div>
			<div>
				<label for="imageUrl">Image url:</label>
				<input
					id="imageUrl"
					name="imageUrl"
					type="text"
					placeholder="Image Url"
					.value=${item.imageUrl}
				/>
			</div>
			<button class="btn" type="submit">Submit</button>
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
		date: data.date,
		author: data.author,
		imageUrl: data.imageUrl,
		description: data.description,
	});

	event.target.reset();
	ctx.page.redirect('/details/' + id);
}
