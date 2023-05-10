import { del, get, post, put } from './api.js';

export async function getAllAlbums() {
	return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(album) {
	return post('/data/albums', album);
}

export async function getById(id) {
	return get('/data/albums/' + id);
}

export async function deleteById(id) {
	return del('/data/albums/' + id);
}

export async function updateAlbum(id, album) {
	return put('/data/albums/' + id, album);
}

export async function searchAlbums(query) {
	return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
