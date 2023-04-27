import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAll: '/data/posts?sortBy=_createdOn%20desc',
	create: '/data/posts',
	getById: '/data/posts/',
	deleteById: '/data/posts/',
	editById: '/data/posts/',
	profile: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
	donations: '/data/donations',
	allDonations: (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
	hasDonate: (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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

export async function donations(id) {
	return api.post(endpoints.donations, id);
}

export async function allDonations(id) {
	return api.get(endpoints.allDonations(id));
}

export async function hasDonate(id, userId) {
	return api.get(endpoints.hasDonate(id, userId));
}
