import { getAllAlbums } from '../api/albums.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const catalogTemplate = (albums, userData) => html`<section id="catalogPage">
	<h1>All Albums</h1>
	${albums.length > 0
		? albums.map((album) => albumCard(album, userData))
		: html`<p>No Albums in Catalog!</p>`}
</section>`;

const albumCard = (album, userData) => html`<div class="card-box">
	<img src=${album.imgUrl} />
	<div>
		<div class="text-center">
			<p class="name">Name: ${album.name}</p>
			<p class="artist">Artist: ${album.artist}</p>
			<p class="genre">Genre: ${album.genre}</p>
			<p class="price">Price: $${album.price}</p>
			<p class="date">Release Date: ${album.releaseDate}</p>
		</div>
		${userData
			? html`<div class="btn-group">
					<a href="/details/${album._id}" id="details">Details</a>
			  </div>`
			: nothing}
	</div>
</div>`;

export async function catalogView(ctx) {
	const userData = getUserData();
	const albums = await getAllAlbums();
	ctx.render(catalogTemplate(albums, userData));
}
