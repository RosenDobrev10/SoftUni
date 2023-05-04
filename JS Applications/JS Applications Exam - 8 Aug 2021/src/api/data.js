import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAll: '/data/books?sortBy=_createdOn%20desc',
	create: '/data/books',
	getById: '/data/books/',
	deleteById: '/data/books/',
	editById: '/data/books/',
	getMyBooks: (userId) =>
		`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
	addLike: '/data/likes',
	totalLikes: (bookId) =>
		`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
	hasLiked: (bookId, userId) =>
		`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

// CHANGE FUNCTION NAMES AND CHANGE THE ENDPOINTS
export async function getAll() {
	return api.get(endpoints.getAll);
}

export async function create(data) {
	return api.post(endpoints.create, data);
}

export async function getById(id) {
	return api.get(endpoints.getById + id);
}

export async function editById(id, data) {
	return api.put(endpoints.editById + id, data);
}

export async function deleteById(id) {
	return api.del(endpoints.deleteById + id);
}

export async function getMyBooks(id) {
	return api.get(endpoints.getMyBooks(id));
}

export async function addLike(id) {
	return api.post(endpoints.addLike, id);
}

export async function totalLikes(id) {
	return api.get(endpoints.totalLikes(id));
}

export async function hasLiked(id, userId) {
	return api.get(endpoints.hasLiked(id, userId));
}
