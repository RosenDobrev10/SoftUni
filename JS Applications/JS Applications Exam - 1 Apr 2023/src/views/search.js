import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const cardTemplate = (fruit) => html`
	<div class="fruit">
		<img src=${fruit.imageUrl} alt="example1" />
		<h3 class="title">${fruit.name}</h3>
		<p class="description">${fruit.description}</p>
		<a class="details-btn" href="/details/${fruit._id}">More Info</a>
	</div>
`;

const searchTemplate = (fruits, onSubmit) => html`
	<section id="search">
		<div class="form">
			<h2>Search</h2>
			<form class="search-form" @submit=${onSubmit}>
				<input type="text" name="search" id="search-input" />
				<button class="button-list">Search</button>
			</form>
		</div>
		<h4>Results:</h4>
		<div class="search-result">
			${fruits.length > 0
				? fruits.map(cardTemplate)
				: html`<p class="no-result">No result.</p>`}
		</div>
	</section>
`;

export async function searchPage(ctx) {
	let fruits = [];
	ctx.render(searchTemplate(fruits, onSubmit));

	async function onSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const query = formData.get('search');
		if (query === '') {
			return alert('Field is required!');
		}

		fruits = await service.search(query);
		event.target.reset();
		ctx.render(searchTemplate(fruits, onSubmit));
	}
}
