import { html } from '../../node_modules/lit-html/lit-html.js';
import * as commentService from '../api/comments.js';

const commentCard = (comment) => html`<li class="comment">
	<p>Content: ${comment.comment}</p>
</li>`;

const commentList = (comments) => html`<ul>
	${comments.map(commentCard)}
</ul>`;

const commentsTemplate = (comments) => html` <div class="details-comments">
	<h2>Comments:</h2>
	${comments.length > 0
		? commentList(comments)
		: html`<p class="no-comment">No comments.</p>`}
</div>`;

export async function commentsView(gameId) {
	const comments = await commentService.getByGameId(gameId);
	return commentsTemplate(comments);
}
