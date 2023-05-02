import { del, get, post, put } from './api.js';

export async function getAllMemes() {
	return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(meme) {
	return post('/data/memes', meme);
}

export async function getById(id) {
	return get('/data/memes/' + id);
}

export async function deleteById(id) {
	return del('/data/memes/' + id);
}

export async function updateMeme(id, meme) {
	return put('/data/memes/' + id, meme);
}

export async function getMemesByUser(userId) {
	return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
