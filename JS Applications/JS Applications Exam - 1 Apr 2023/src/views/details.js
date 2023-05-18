import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const detailsTemplate = (fruit, onDelete) => html`
	<section id="details">
		<div id="details-wrapper">
			<img id="details-img" src=${fruit.imageUrl} alt="example1" />
			<p id="details-title">${fruit.name}</p>
			<div id="info-wrapper">
				<div id="details-description">
					<p>${fruit.description}</p>
					<p id="nutrition">Nutrition</p>
					<p id="details-nutrition">${fruit.nutrition}</p>
				</div>
				${fruit.isOwner
					? html`
							<div id="action-buttons">
								<a href="/edit/${fruit._id}" id="edit-btn"
									>Edit</a
								>
								<a
									@click=${onDelete}
									href="javascript:void(0)"
									id="delete-btn"
									>Delete</a
								>
							</div>
					  `
					: nothing}
			</div>
		</div>
	</section>
`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const fruit = await service.getById(id);
	if (ctx.user) {
		fruit.isOwner = ctx.user._id === fruit._ownerId;
	}
	ctx.render(detailsTemplate(fruit, onDelete));

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this fruit?');
		if (choice) {
			await service.deleteById(id);
			ctx.page.redirect('/');
		}
	}
}
