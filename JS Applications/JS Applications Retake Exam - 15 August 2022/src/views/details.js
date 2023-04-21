import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

//  Add @click=${onDelete} and javascript:void(0) to Delete button or anchor and change variable name
//  Add @click=${onClick}  and javascript:void(0) to Like button or anchor and change variable name
// Add /edit/${shoe._id} to Edit button
// ${shoe.}
const detailsTemplate = (shoe, onDelete) => html` <section id="details">
	<div id="details-wrapper">
		<p id="details-title">Shoe Details</p>
		<div id="img-wrapper">
			<img src=${shoe.imageUrl} alt="example1" />
		</div>
		<div id="info-wrapper">
			<p>Brand: <span id="details-brand">${shoe.brand}</span></p>
			<p>Model: <span id="details-model">${shoe.model}</span></p>
			<p>
				Release date: <span id="details-release">${shoe.release}</span>
			</p>
			<p>Designer: <span id="details-designer">${shoe.designer}</span></p>
			<p>Value: <span id="details-value">${shoe.value}</span></p>
		</div>

		<!--Edit and Delete are only for creator-->
		${shoe.isOwner
			? html`<div id="action-buttons">
					<a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
					<a
						@click=${onDelete}
						href="javascript:void(0)"
						id="delete-btn"
						>Delete</a
					>
			  </div>`
			: nothing}
	</div>
</section>`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const shoe = await service.getById(id); // Change variable name and function name from service
	if (ctx.user) {
		shoe.isOwner = ctx.user._id === shoe._ownerId; // Change variable name
	}
	ctx.render(detailsTemplate(shoe, onDelete)); // Change variable name

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this?');
		if (choice) {
			await service.deleteById(id); // Change function name from service
			ctx.page.redirect('/catalog');
		}
	}
}
