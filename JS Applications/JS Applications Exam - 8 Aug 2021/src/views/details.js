import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { getUserData } from '../util.js';

//  Add @click=${onDelete} to Delete button or anchor and change variable name
const detailsTemplate = (book, onDelete, onClick) => html`<section
	id="details-page"
	class="details"
>
	<div class="book-information">
		<h3>${book.title}</h3>
		<p class="type">Type: ${book.type}</p>
		<p class="img"><img src=${book.imageUrl} /></p>
		<div class="actions">
			${book.isOwner
				? html`<a class="button" href="/edit/${book._id}">Edit</a>
						<a
							@click=${onDelete}
							class="button"
							href="javascript:void(0)"
							>Delete</a
						>`
				: nothing}
			${book.isLogged && !book.isOwner && !book.hasLiked
				? html`<a
						@click=${onClick}
						class="button"
						href="javascript:void(0)"
						>Like</a
				  >`
				: nothing}

			<div class="likes">
				<img class="hearts" src="/images/heart.png" />
				<span id="total-likes">Likes: ${book.totalLikes}</span>
			</div>
		</div>
	</div>
	<div class="book-description">
		<h3>Description:</h3>
		<p>${book.description}</p>
	</div>
</section>`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const book = await service.getById(id); // Change variable name and function name from service
	book.isLogged = getUserData();
	book.totalLikes = await service.totalLikes(id);
	if (ctx.user) {
		book.isOwner = ctx.user._id && ctx.user._id === book._ownerId; // Change variable name
		book.hasLiked = await service.hasLiked(id, ctx.user._id);
	}
	ctx.render(detailsTemplate(book, onDelete, onClick)); // Change variable name

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this?');
		if (choice) {
			await service.deleteById(id); // Change function name from service
			ctx.page.redirect('/');
		}
	}

	async function onClick() {
		await service.addLike({ bookId: id });
		ctx.page.redirect('/details/' + id);
	}
}
