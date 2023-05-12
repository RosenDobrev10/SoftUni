import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { getUserData } from '../util.js';

//  Add @click=${onDelete} and javascript:void(0) to Delete button or anchor and change variable name
//  Add @click=${onClick}  and javascript:void(0) to Like button or anchor and change variable name
// Add /edit/${album._id} to Edit button
// ${album.}
const detailsTemplate = (album, onDelete, onClick) => html`<section
	id="details"
>
	<div id="details-wrapper">
		<p id="details-title">Album Details</p>
		<div id="img-wrapper">
			<img src=${album.imageUrl} alt="example1" />
		</div>
		<div id="info-wrapper">
			<p>
				<strong>Band:</strong
				><span id="details-singer">${album.singer}</span>
			</p>
			<p>
				<strong>Album name:</strong
				><span id="details-album">${album.album}</span>
			</p>
			<p>
				<strong>Release date:</strong
				><span id="details-release">${album.release}</span>
			</p>
			<p>
				<strong>Label:</strong
				><span id="details-label">${album.label}</span>
			</p>
			<p>
				<strong>Sales:</strong
				><span id="details-sales">${album.sales}</span>
			</p>
		</div>
		<div id="likes">
			Likes: <span id="likes-count">${album.allLikes}</span>
		</div>

		<div id="action-buttons">
			${
				album.isOwner
					? html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
							<a
								@click=${onDelete}
								href="javascript:void(0)"
								id="delete-btn"
								>Delete</a
							>`
					: nothing
			}
			
			${
				album.isLogged && !album.isOwner && !album.canLike
					? html`<a
							@click=${onClick}
							href="javascript:void(0)"
							id="like-btn"
							>Like</a
					  >`
					: nothing
			}
          </div>
        </div>
	</div>
</section>`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const album = await service.getById(id); // Change variable name and function name from service
	album.allLikes = await service.allLikes(id);
	album.isLogged = getUserData();
	if (ctx.user) {
		album.isOwner = ctx.user._id === album._ownerId; // Change variable name
		album.canLike = await service.canLike(id, ctx.user._id);
	}
	ctx.render(detailsTemplate(album, onDelete, onClick)); // Change variable name

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this?');
		if (choice) {
			await service.deleteById(id); // Change function name from service
			ctx.page.redirect('/catalog');
		}
	}

	async function onClick() {
		await service.like({ albumId: id });
		ctx.page.redirect('/details/' + id);
	}
}
