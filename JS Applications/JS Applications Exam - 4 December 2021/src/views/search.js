import { searchAlbums } from '../api/albums.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const searchTemplate = (isClicked, onClick, albums, isLogged) => html`<section
	id="searchPage"
>
	<h1>Search by Name</h1>

	<div class="search">
		<input
			id="search-input"
			type="text"
			name="search"
			placeholder="Enter desired albums's name"
		/>
		<button @click=${onClick} class="button-list">Search</button>
	</div>

	<h2>Results:</h2>
	<div class="search-result">
		${isClicked
			? albums.length > 0
				? html`${albums.map((album) => albumCard(album, isLogged))}`
				: html`<p class="no-result">No result.</p>`
			: nothing}
	</div>
</section>`;

const albumCard = (album, isLogged) => html`<div class="card-box">
	<img src=${album.imgUrl} />
	<div>
		<div class="text-center">
			<p class="name">Name: ${album.name}</p>
			<p class="artist">Artist: ${album.artist}</p>
			<p class="genre">Genre: ${album.genre}</p>
			<p class="price">Price: $${album.price}</p>
			<p class="date">Release Date: ${album.releaseDate}</p>
		</div>
		${isLogged
			? html`<div class="btn-group">
					<a href="/details/${album._id}" id="details">Details</a>
			  </div>`
			: nothing}
	</div>
</div>`;

export async function searchView(ctx) {
	ctx.render(searchTemplate(false, onClick));

	async function onClick() {
		const query = document.querySelector('#search-input').value;
		if (query === '') {
			return alert('This field is required!');
		}
		const isLogged = getUserData();
		const albums = await searchAlbums(query);
		ctx.render(searchTemplate(true, onClick, albums, isLogged));
	}
}
