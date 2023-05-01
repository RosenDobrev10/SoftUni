import { createMeme } from '../api/memes.js';
import { html } from '../lib.js';
import { notify } from '../notify.js';

const createTemplate = (onSubmit) => html`<section id="create-meme">
	<form @submit=${onSubmit} id="create-form">
		<div class="container">
			<h1>Create Meme</h1>
			<label for="title">Title</label>
			<input
				id="title"
				type="text"
				placeholder="Enter Title"
				name="title"
			/>
			<label for="description">Description</label>
			<textarea
				id="description"
				placeholder="Enter Description"
				name="description"
			></textarea>
			<label for="imageUrl">Meme Image</label>
			<input
				id="imageUrl"
				type="text"
				placeholder="Enter meme ImageUrl"
				name="imageUrl"
			/>
			<input
				type="submit"
				class="registerbtn button"
				value="Create Meme"
			/>
		</div>
	</form>
</section>`;

export function createView(ctx) {
	ctx.render(createTemplate(onSubmit));

	async function onSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const meme = {
			title: formData.get('title'),
			description: formData.get('description'),
			imageUrl: formData.get('imageUrl'),
		};

		if (
			meme.title === '' ||
			meme.description === '' ||
			meme.imageUrl === ''
		) {
			return notify('All fields are required!');
		}

		await createMeme(meme);
		event.target.reset();
		ctx.page.redirect('/memes');
	}
}
