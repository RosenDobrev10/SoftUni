import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAllPets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
	create: '/data/pets',
	getById: '/data/pets/',
	deleteById: '/data/pets/',
	editById: '/data/pets/',
	donate: '/data/donation',
	allDonations: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
	canDonate: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

// CHANGE FUNCTION NAMES AND CHANGE THE ENDPOINTS
export async function getAll() {
	return api.get(endpoints.getAllPets);
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

export async function donate(id) {
	return api.post(endpoints.donate, id);
}

export async function allDonations(id) {
	return api.get(endpoints.allDonations(id));
}

export async function canDonate(id, userId) {
	return api.get(endpoints.canDonate(id, userId));
}
