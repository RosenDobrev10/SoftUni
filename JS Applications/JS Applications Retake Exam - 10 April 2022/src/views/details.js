import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { getUserData } from '../util.js';

//  Add @click=${onDelete} and javascript:void(0) to Delete button or anchor and change variable name
//  Add @click=${onClick}  and javascript:void(0) to Like button or anchor and change variable name
//  Add /edit/${item._id} to Edit button
//  Add ${item.allBoughts} to bonus element
// ${item.}
const detailsTemplate = (item, onDelete, onClick) => html`
	<section id="details-page">
		<h1 class="title">Post Details</h1>

		<div id="container">
			<div id="details">
				<div class="image-wrapper">
					<img
						src=${item.imageUrl}
						alt="Material Image"
						class="post-image"
					/>
				</div>
				<div class="info">
					<h2 class="title post-title">${item.title}</h2>
					<p class="post-description">Description: ${item.description}</p>
					<p class="post-address">Address: ${item.address}</p>
					<p class="post-number">Phone number: ${item.phone}</p>
					<p class="donate-Item">Donate Materials: ${item.allDonations}</p>

					<div class="btns">
						${item.isOwner
							? html`<a
										href="/edit/${item._id}"
										class="edit-btn btn"
										>Edit</a
									>
									<a
										@click=${onDelete}
										href="javascript:void(0)"
										class="delete-btn btn"
										>Delete</a
									> `
							: nothing}
						${item.isLogged && !item.isOwner && !item.hasDonate
							? html`<a
									@click=${onClick}
									href="javascript:void(0)"
									class="donate-btn btn"
									>Donate</a
							  > `
							: nothing}
					</div>
				</div>
			</div>
		</div>
	</section>
`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const item = await service.getById(id); // Change variable name and function name from service
	item.allDonations = await service.allDonations(id);
	item.isLogged = getUserData();
	if (ctx.user) {
		item.isOwner = ctx.user._id === item._ownerId; // Change variable name
		item.hasDonate = await service.hasDonate(id, ctx.user._id);
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
		await service.donations({ postId: id });
		ctx.page.redirect('/details/' + id);
	}
}
