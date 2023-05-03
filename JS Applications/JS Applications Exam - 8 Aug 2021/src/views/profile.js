import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const profileTemplate = (books) => html` <section
	id="my-books-page"
	class="my-books"
>
	<h1>My Books</h1>
	${books.length > 0
		? html`<ul class="my-books-list">
				${books.map(cardTemplate)}
		  </ul>`
		: html`<p class="no-books">No books in database!</p>`}
</section>`; // Change variable name

const cardTemplate = (book) => html`<li class="otherBooks">
	<h3>${book.title}</h3>
	<p>Type: ${book.type}</p>
	<p class="img"><img src=${book.imageUrl} /></p>
	<a class="button" href="/details/${book._id}">Details</a>
</li>`; // Collection in singular form(Единствено число)

export async function profilePage(ctx) {
	const books = await service.getMyBooks(ctx.user._id); // Change variable name and function from service
	ctx.render(profileTemplate(books)); // Change variable name
}
