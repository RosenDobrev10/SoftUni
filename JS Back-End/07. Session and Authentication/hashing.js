const bcrypt = require('bcrypt');

async function hash(password){
    return bcrypt.hash(password, 10)
}

async function compare(password, hashedPass){
    return bcrypt.compare(password, hashedPass)
}

const hashedPass = bcrypt.hash('123456', 10); // Подава се паролата като 1 парам и колко пъти да се осоли като втори парам
console.log(hashedPass);

const result = bcrypt.compare( '123456', '$2b$10$dmH6GM80HUfpSywi56KjvuBh7NVlRzLAWTmbLlR4Umk8u1fTPXESO',);
// Подаваме паролата и хешираната парола и ни връща true или false, в зависимост от това дали са еднакви 
console.log(result);

module.exports = {
    hash,
    compare
}
