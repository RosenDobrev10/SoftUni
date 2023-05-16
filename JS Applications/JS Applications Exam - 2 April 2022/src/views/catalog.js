import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const cardTemplate = (pet) => html`<div class="animals-board">
	<article class="service-img">
		<img class="animal-image-cover" src=${pet.image} />
	</article>
	<h2 class="name">${pet.name}</h2>
	<h3 class="breed">${pet.breed}</h3>
	<div class="action">
		<a class="btn" href="/details/${pet._id}">Details</a>
	</div>
</div>`; // Collection in singular form(Единствено число)

const catalogTemplate = (pets) => html`<section id="dashboard">
	<h2 class="dashboard-title">Services for every animal</h2>
	<div class="animals-dashboard">
		${pets.length > 0
			? pets.map(cardTemplate)
			: html`<p class="no-pets">No pets in dashboard</p>`}
	</div>
</section>`; // Change variable name

export async function catalogPage(ctx) {
	const pets = await service.getAll(); // Change variable name and function from service
	ctx.render(catalogTemplate(pets)); // Change variable name
}
