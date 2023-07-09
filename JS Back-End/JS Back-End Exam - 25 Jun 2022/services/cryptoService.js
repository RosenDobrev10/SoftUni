const Crypto = require("../models/Crypto.js");

async function getAll(){
    return Crypto.find({}).lean()
}

async function create(crypto){
    return Crypto.create(crypto);
}

async function getbyId(id){
    return Crypto.findById(id).lean();
}

async function deletebyId(id){
    return Crypto.findByIdAndDelete(id);
}

async function updatebyId(id, crypto){
    const existing = await Crypto.findById(id);

    existing.name = crypto.name;
    existing.price = crypto.price;
    existing.imageUrl = crypto.imageUrl;
    existing.description = crypto.description;
    existing.payment = crypto.payment;

    return existing.save();
}

async function buy(cryptoId, userId){
    const existing = await Crypto.findById(cryptoId);
    existing.buyers.push(userId);
    return existing.save();
}

async function search(nameSearch, paymentSearch) {
    let crypto = await getAll();

    if (nameSearch){
        crypto = crypto.filter(crypto => crypto.name.toLowerCase().includes(nameSearch.toLowerCase()));
    }

    if (paymentSearch){
        crypto = crypto.filter(crypto => crypto.payment.toLowerCase() == paymentSearch.toLowerCase());
    }

    return crypto;
}

module.exports = {
    getAll, 
    create,
    getbyId,
    deletebyId,
    updatebyId,
    buy,
    search
}