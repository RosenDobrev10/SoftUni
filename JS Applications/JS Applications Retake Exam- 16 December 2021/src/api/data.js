import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
	create: '/data/theaters',
	getById: '/data/theaters/',
	deleteById: '/data/theaters/',
	editById: '/data/theaters/',
	profile: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
	likes: '/data/likes',
	allLikes: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
	hasLike: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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

export async function profile(id) {
	return api.get(endpoints.profile(id));
}

export async function likes(id) {
	return api.post(endpoints.likes, id);
}

export async function allLikes(id) {
	return api.get(endpoints.allLikes(id));
}

export async function hasLike(id, userId) {
	return api.get(endpoints.hasLike(id, userId));
}
