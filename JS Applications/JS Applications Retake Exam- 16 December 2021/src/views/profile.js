import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { getUserData } from '../util.js';

// ${item.} for every dynamic content
// /details/${item._id} to details href
const cardTemplate = (item) => html`
	<div class="eventBoard">
		<div class="event-info">
			<img src=${item.imageUrl} />
			<h2>${item.title}</h2>
			<h6>${item.date}</h6>
			<a href="/details/${item._id}" class="details-button">Details</a>
		</div>
	</div>
`; // Collection in singular form(Единствено число)

// ${items.length > 0 ? items.map(cardTemplate) : html``}
const profileTemplate = (items, user) => html`
	<section id="profilePage">
		<div class="userInfo">
			<div class="avatar">
				<img src="./images/profilePic.png" />
			</div>
			<h2>${user.email}</h2>
		</div>
		<div class="board">
			${items.length > 0
				? items.map(cardTemplate)
				: html`<div class="no-events">
						<p>This user has no events yet!</p>
				  </div>`}
		</div>
	</section>
`; // Change variable name

export async function profilePage(ctx) {
	const userId = ctx.user._id;
	const user = getUserData();
	const items = await service.profile(userId); // Change variable name and function from service
	ctx.render(profileTemplate(items, user)); // Change variable name
}
