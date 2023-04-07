import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { getUserData } from '../util.js';

//  Add @click=${onDelete} and javascript:void(0) to Delete button or anchor and change variable name
//  Add @click=${onClick}  and javascript:void(0) to Like button or anchor and change variable name
//  Add /edit/${item._id} to Edit button href
//  Add ${item.allBoughts} to bonus element
// ${item.}
const detailsTemplate = (item, onDelete, onClick) => html`
	<section id="detailsPage">
		<div id="detailsBox">
			<div class="detailsInfo">
				<h1>Title: ${item.title}</h1>
				<div>
					<img src=${item.imageUrl} />
				</div>
			</div>

			<div class="details">
				<h3>Theater Description</h3>
				<p>${item.description}</p>
				<h4>Date: ${item.date}</h4>
				<h4>Author: ${item.author}</h4>
				<div class="buttons">
					${item.isOwner
						? html`
								<a
									@click=${onDelete}
									class="btn-delete"
									href="javascript:void(0)"
									>Delete</a
								>
								<a class="btn-edit" href="/edit/${item._id}"
									>Edit</a
								>
						  `
						: nothing}
					${item.isLogged && !item.isOwner && !item.hasLike
						? html`
								<a
									@click=${onClick}
									class="btn-like"
									href="javascript:void(0)"
									>Like</a
								>
						  `
						: nothing}
				</div>
				<p class="likes">Likes: ${item.allLikes}</p>
			</div>
		</div>
	</section>
`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const item = await service.getById(id); // Change variable name and function name from service
	item.allLikes = await service.allLikes(id);
	item.isLogged = getUserData();
	if (ctx.user) {
		item.isOwner = ctx.user._id === item._ownerId; // Change variable name
		item.hasLike = await service.hasLike(id, ctx.user._id);
	}
	ctx.render(detailsTemplate(item, onDelete, onClick)); // Change variable name

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this?');
		if (choice) {
			await service.deleteById(id); // Change function name from service
			ctx.page.redirect('/');
		}
	}

	async function onClick() {
		await service.likes({ theaterId: id });
		ctx.page.redirect('/details/' + id);
	}
}
