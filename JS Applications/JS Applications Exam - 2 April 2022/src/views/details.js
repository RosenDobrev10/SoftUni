import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

//  Add @click=${onDelete} to Delete button or anchor and change variable name
const detailsTemplate = (
	pet,
	onDelete,
	user,
	onDonate,
	donations,
	canDonate,
) => html`<section id="detailsPage">
	<div class="details">
		<div class="animalPic">
			<img src=${pet.image} />
		</div>
		<div>
			<div class="animalInfo">
				<h1>Name: ${pet.name}</h1>
				<h3>Breed: ${pet.breed}</h3>
				<h4>Age: ${pet.age}</h4>
				<h4>Weight: ${pet.weight}</h4>
				<h4 class="donation">Donation: ${donations * 100}$</h4>
			</div>
			${user
				? html`<div class="actionBtn">
						${pet.isOwner
							? html`<!-- Only for registered user and creator of the pets-->
									<a href="/edit/${pet._id}" class="edit"
										>Edit</a
									>
									<a
										@click=${onDelete}
										href="#"
										class="remove"
										>Delete</a
									> `
							: nothing}
						${!pet.isOwner && user && !canDonate
							? html`<!--(Bonus Part) Only for no creator and user-->
									<a
										@click=${onDonate}
										href="javascript:void(0)"
										class="donate"
										>Donate</a
									>`
							: nothing}
				  </div>`
				: nothing}
		</div>
	</div>
</section>`;

export async function detailsPage(ctx) {
	const id = ctx.params.id;
	const pet = await service.getById(id); // Change variable name and function name from service
	const donations = await service.allDonations(id);
	const canDonate = await service.canDonate(id, ctx.user?._id);
	if (ctx.user) {
		pet.isOwner = ctx.user._id === pet._ownerId; // Change variable name
	}
	ctx.render(
		detailsTemplate(
			pet,
			onDelete,
			ctx.user,
			onDonate,
			donations,
			canDonate,
		),
	); // Change variable name

	async function onDelete() {
		const choice = confirm('Are you sure you want to delete this?');
		if (choice) {
			await service.deleteById(id); // Change function name from service
			ctx.page.redirect('/');
		}
	}

	async function onDonate() {
		await service.donate({ petId: id });
		ctx.page.redirect('/details/' + id);
	}
}
