import { showHome } from './home.js';
import { createElements } from './untils.js';

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);

function fetchPost() {
	const postId = localStorage.getItem('postId');
	loadPost(postId);
}

fetchPost();

async function loadPost(postId) {
	try {
		const res = await fetch(
			`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`,
		);

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.message);
		}
		const post = await res.json();
		const themContentDivElement = document.querySelector('.theme-content');
		themContentDivElement.replaceChildren();

		const themeTitileDivElement = createElements('div', '', themContentDivElement, {
			class: 'theme-title',
		});
		const themeNameWrapperDivElement = createElements('div', '', themeTitileDivElement, {
			class: 'theme-name-wrapper',
		});
		const themeNameDivElement = createElements('div', '', themeNameWrapperDivElement, {
			class: 'theme-name',
		});
		createElements('h2', post.title, themeNameDivElement, {});

		const commentDivElement = createElements('div', '', themContentDivElement, {
			class: 'comment',
		});
		const headerDivElement = createElements('div', '', commentDivElement, {
			class: 'header',
		});
		createElements('img', '', headerDivElement, {
			src: './static/profile.png',
			alt: 'avatar',
		});
		const paragraphElement = createElements('p', '', headerDivElement, {});
		paragraphElement.innerHTML = `<span>${post.username}</span> posted on <time>${post.createDate}</time>`;
		createElements('p', post.content, headerDivElement, {
			class: 'post-content',
		});

		const comments = await loadComments(postId);

		for (const comment of Object.values(comments)) {
			const userCommentDivElement = createElements('div', '', commentDivElement, {
				class: 'user-comment',
			});
			const topicNameWrapper = createElements('div', '', userCommentDivElement, {
				class: 'topic-name-wrapper',
			});
			const topicNameDivElement = createElements('div', '', topicNameWrapper, {
				class: 'topic-name',
			});
			const paragraphElement = createElements('p', '', topicNameDivElement, {});
			paragraphElement.innerHTML = `<strong>${comment.username}</strong> commented on <time>${comment.createDate}</time>`;
			const postContentDivElement = createElements('div', '', topicNameDivElement, {
				class: 'post-content',
			});
			createElements('p', comment.content, postContentDivElement, {});
		}

		const asnwerCommentDivElement = createElements('div', '', themContentDivElement, {
			class: 'answer-comment',
		});
		const answerParagraphElement = createElements('p', '', asnwerCommentDivElement, {});
		answerParagraphElement.innerHTML = `<span>currentUser</span> comment:`;
		const divElementAnswer = createElements('div', '', asnwerCommentDivElement, {
			class: 'answer',
		});
		const formAnswerElement = createElements('form', '', divElementAnswer, {});
		formAnswerElement.innerHTML = ` <textarea name="postText" id="comment" cols="30" rows="10"></textarea>`;
		const formDivElement = createElements('div', '', formAnswerElement, {});
		const labeElement = createElements('label', '', formDivElement, {
			for: 'username',
		});
		labeElement.innerHTML = `Username <span class='red'>*</span>`;
		createElements('input', '', formDivElement, {
			type: 'text',
			name: 'username',
			id: 'username',
		});
		createElements('button', 'Post', formAnswerElement, {
			id: 'postButton',
		});
		let formElement = document.querySelector('form');
		formElement.setAttribute('dataset.id', postId);

		const postButtonElemnt = document.getElementById('postButton');
		console.log(postButtonElemnt);

		postButtonElemnt.addEventListener('click', async (event) => {
			event.preventDefault();
			let postId = formElement.getAttribute('dataset.id');

			let content = document.querySelector('textarea').value.trim();
			let username = document.querySelector('input').value.trim();
			console.log(username, content);
			let createDate = new Date();
			try {
				if (!username) {
					throw new Error('Username is requierd!');
				} else if (!content) {
					throw new Error('Content is requierd!');
				}
				const res = await fetch(
					'http://localhost:3030/jsonstore/collections/myboard/comments',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							username,
							content,
							createDate,
							postId,
						}),
					},
				);
				if (!res.ok) {
					throw new Error('ERORR');
				}
				fetchPost();
				formElement.reset();
			} catch (err) {
				alert(err.message);
			}
		});
	} catch (error) {
		alert(error.message);
	}
}

async function loadComments(postId) {
	try {
		const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.message);
		}
		const comments = await res.json();
		return Object.values(comments).filter((comment) => comment.postId === postId);
	} catch (error) {
		alert(error.message);
	}
}
