import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAll: '/data/albums?sortBy=_createdOn%20desc',
	create: '/data/albums',
	getById: '/data/albums/',
	deleteById: '/data/albums/',
	editById: '/data/albums/',
	like: '/data/likes',
	allLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
	canLike: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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

export async function deleteById(id) {
	return api.del(endpoints.deleteById + id);
}

export async function editById(id, data) {
	return api.put(endpoints.editById + id, data);
}

export async function like(id) {
	return api.post(endpoints.like, id);
}

export async function allLikes(id) {
	return api.get(endpoints.allLikes(id));
}

export async function canLike(id, userId) {
	return api.get(endpoints.canLike(id, userId));
}
