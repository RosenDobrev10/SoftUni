import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const homeTemplate = (books) => html`<section
	id="dashboard-page"
	class="dashboard"
>
	<h1>Dashboard</h1>
	${books.length > 0
		? html`<ul class="other-books-list">
				${books.map(cardTemplate)}
		  </ul>`
		: html`<p class="no-books">No books in database!</p>`}
</section> `; // Change variable name

const cardTemplate = (book) => html`<li class="otherBooks">
	<h3>${book.title}</h3>
	<p>Type: ${book.type}</p>
	<p class="img"><img src=${book.imageUrl} /></p>
	<a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function homePage(ctx) {
	const books = await service.getAll();
	ctx.render(homeTemplate(books)); // Change variable name
}
