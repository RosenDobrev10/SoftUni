const Ad = require("../models/Ad.js");

async function getAll(){
    return Ad.find({}).lean();
}

async function getAllPopulated(){
    return Ad.find({}).populate('owner', 'email').lean();
}

async function getFirstThree(){
    return Ad.find().sort({ _id: 1 }).limit(3).lean();  // Първите 3 публикувани в db 
}

async function create(ad){
    return Ad.create(ad);
}

async function getbyId(id){
    return Ad.findById(id).populate('owner', 'email').populate('appliers', 'email skills').lean();
}

async function deletebyId(id){
    return Ad.findByIdAndDelete(id);
}

async function updatebyId(id, ad){
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.name = ad.name;
    existing.description = ad.description;

    return existing.save();
}

async function apply(id, userId){
    const existing = await Ad.findById(id);

    existing.appliers.push(userId);

    return existing.save();
}

async function search(email) {
    let ads = await getAllPopulated();
    if (email){
        ads = ads.filter(ad => ad.owner.email.toLowerCase().includes(email.toLowerCase()));
    }

    return ads;
}

module.exports = {
    getAll,
    getFirstThree,
    create,
    getbyId,
    deletebyId,
    updatebyId,
    apply,
    search,
}