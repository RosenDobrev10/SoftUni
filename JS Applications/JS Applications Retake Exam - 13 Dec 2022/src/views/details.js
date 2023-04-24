import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { getUserData } from '../util.js';

//  Add @click=${onDelete} and javascript:void(0) to Delete button or anchor and change variable name
//  Add @click=${onClick}  and javascript:void(0) to Like button or anchor and change variable name
//  Add /edit/${item._id} to Edit button
//  Add ${item.allBoughts} to bonus element
// ${item.}
const detailsTemplate = (item, onDelete, onClick) => html`
	<section id="details">
		<div id="details-wrapper">
			<img id="details-img" src=${item.imageUrl} alt="example1" />
			<p id="details-title">${item.name}</p>
			<p id="details-category">
				Category: <span id="categories">${item.category}</span>
			</p>
			<p id="details-price">
				Price: <span id="price-number">${item.price}</span>$
			</p>
			<div id="info-wrapper">
				<div id="details-description">
					<h4>
						Bought: <span id="buys">${item.allBoughts}</span> times.
					</h4>
					<span>${item.description}</span>
				</div>
			</div>

			<div id="action-buttons">
				${item.isOwner
					? html`
							<a href="/edit/${item._id}" id="edit-btn">Edit</a>
							<a
								@click=${onDelete}
								href="javascript:void(0)"
								id="delete-btn"
								>Delete</a
							>
					  `
					: nothing}
				${item.isLogged && !item.isOwner && !item.hasBought
					? html`
							<a
								@click=${onClick}
								href="javascript:void(0)"
								id="buy-btn"
								>Buy</a
							>
					  `
					: nothing}
			</div>
		</div>
	</section>
`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const item = await service.getById(id); // Change variable name and function name from service
	item.allBoughts = await service.allBoughts(id);
	item.isLogged = getUserData();
	if (ctx.user) {
		item.isOwner = ctx.user._id === item._ownerId; // Change variable name
		item.hasBought = await service.hasBought(id, ctx.user._id);
	}
	ctx.render(detailsTemplate(item, onDelete, onClick)); // Change variable name

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this?');
		if (choice) {
			await service.deleteById(id); // Change function name from service
			ctx.page.redirect('/catalog');
		}
	}

	async function onClick() {
		await service.bought({ productId: id });
		ctx.page.redirect('/details/' + id);
	}
}
